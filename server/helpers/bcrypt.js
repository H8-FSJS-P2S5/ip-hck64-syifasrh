const bcrypt = require("bcrypt");

const hashPass = (plainPass) => {
    return bcrypt.hashSync(plainPass, bcrypt.genSaltSync(12))
};

const comparePass = (plainPass, hashPass) => {
    return bcrypt.compareSync(plainPass, hashPass)
};

module.exports = {
    hashPass,
    comparePass
}