const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

function getRegister(req, res){
    res.render('users/register');
}

async function postRegister (req, res){
    const reqUser = req.body;
    if (reqUser.password.length <5){
        errorHandler('The password must be at least 5 symbols');
        return;
    }
    const salt = encryption.generateSalt();
    const hashedPass =
        encryption.generateHashedPassword(salt, reqUser.password);
    try {
        const user = await User.create({
            username: reqUser.username,
            hashedPass,
            salt,
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            roles: []
        });
        req.logIn(user, (err, user) => {
            if (err) {
                res.locals.globalError = err;
                res.render('users/register', user);
            } else {
                res.redirect('/');
            }
        });
    } catch (e) {
        console.log(e);
        res.locals.globalError = e;
        res.render('users/register');
    }
    function errorHandler(e) {
        res.locals.globalError = e;
        res.render('users/register');
    }
}

function logout(req, res){
    req.logout();
    res.redirect('/');
}

function getLogin(req, res){
    res.render('users/login');
}

async function postLogin(req, res){
    const reqUser = req.body;
    try {
        const user = await User.findOne({ username: reqUser.username });
        if (!user) {
            errorHandler('Invalid user data');
            return;
        }
        if (!user.authenticate(reqUser.password)) {
            errorHandler('Invalid user data');
            return;
        }
        req.logIn(user, (err, user) => {
            if (err) {
                errorHandler(err);
            } else {
                res.redirect('/');
            }
        });
    } catch (e) {
        errorHandler(e);
    }

    function errorHandler(e) {
        console.log(e);
        res.locals.globalError = e;
        res.render('users/login');
    }
}

module.exports = {
    getRegister,
    postRegister,
    logout,
    getLogin,
    postLogin
};