const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    generateHashedPassword: (pwd) => {
        return bcrypt.hashSync(pwd, saltRounds);
    }
};