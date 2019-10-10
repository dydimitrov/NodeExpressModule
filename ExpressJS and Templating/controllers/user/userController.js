const User = require('../../models/User');
const encryption = require('../../utilities/encryption');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getRegister = (req,res) =>{
    res.render('user/register')
};

module.exports.postRegister = (req,res) =>{
    let user = req.body;

    if (user.password && user.password !== user.repeatPassword){
        user.error = 'Passwords do not match.';
        res.render('user/register', user);
        return;
    }

    if (user.password){
        let hashedPassword = encryption.generateHashedPassword(user.password);
        user.password = hashedPassword;
    }

    User.create(user)
        .then(user => {
            req.logIn(user._doc, (error, user) =>{
                if (error){
                    res.render('user/register', {error: 'Authentication not working!'});
                    return;
                }
            res.redirect('/');
            })
        })
        .catch(error => {
            user.error = error;
            res.render('user/register', user);
        })
};

module.exports.getLogin = (req,res) =>{
    res.render('user/login')
};

module.exports.postLogin= (req,res) =>{
    let userToLogin = req.body;

    User.findOne({ username: userToLogin.username }).then(user => {
        if (!user._doc){
            res.render('/login')
        }
        else{
            bcrypt.compare(userToLogin.password, user._doc.password, function(err, result) {
                if(err){
                    console.log('There is a problem with auth in bcrypt')
                }
                if (result) {
                    req.logIn(user,(error,user)=>{
                        if (error){
                            res.render('user/login',{error: 'There is some problem with Auth'});
                            return
                        }
                        res.redirect('/')
                    });
                }else{
                    res.redirect('/login');
                }
            });
        }
    });
};

module.exports.logout= (req,res)=>{
    req.logout();
    res.redirect('/');
}