const { verifyToken } = require('../helpers/jwt');
const { Order } = require('../models');

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) throw { name: "Unauthorized", message: "Please Login First" };

        const token = authorization.split(' ')[1];
        if (authorization.split(' ')[0] !== "Bearer") {
            throw { name: "Unauthorized", message: "Please Login First" }
        };

        if (!token) throw { name: "Unauthorized", message: "Invalid Token" };

        const { id, username, email } = verifyToken(token);
        req.user = { id, username, email }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authentication };