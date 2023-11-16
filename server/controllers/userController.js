const { User } = require('../models');
const { comparePass } = require('../helpers/bcrypt');
const { createToken, verifyToken } = require('../helpers/jwt');
const {OAuth2Client, JWT} = require('google-auth-library');

class UserController {
    static async register(req, res, next) {
        try {
            const user = await User.create(req.body);
            res
                .status(201)
                .json({ message: `${user.username} with email ${user.email} has been created` });
        } catch (error) {
            next(error);
        }
    };

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) throw { name: "InvalidInput", field: "Email" };
            if (!password) throw { name: "InvalidInput", field: "Password" };

            const user = await User.findOne({
                where: { email }
            });

            if (!user) throw { name: "Unauthenticated" };
            if (!comparePass(password, user.password)) throw { name: "Unauthenticated" };

            const access_token = createToken({ id: user.id, username: user.username, email: user.email });
            res.status(200).json({ access_token, username: user.username, email: user.email });
        } catch (error) {
            if (error.name === "InvalidInput") {
                res.status(400).json({ message: `${error.field} cannot empty` });
            } else {
                next(error);
            }
        }
    };

    static async googleAuth(req, res, next) {
        try {
            const { code } = req.body
            const client = new OAuth2Client();

            const ticket = await client.verifyIdToken({
                idToken: code,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const { email, sub, password, providerId } = ticket.getPayload();
            const user = await User.findOrCreate({ where: { email, username: sub, password: sub } });
            const createdToken = createToken({ id: user[0].id })

            res.status(200).json(createdToken);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = UserController;