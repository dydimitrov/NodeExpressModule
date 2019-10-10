const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};


module.exports = (app) => {
    
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');


    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cookieParser());
    app.use(session({
        secret:'mySuperSecretKey',
        saveUninitialized: false,
        resave:false,
        cookie:{
            expires: 600000
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req,res,next)=>{
        if (req.user){
            res.locals.user = req.user;
        }
        next();
    });

    //TODO: Setup the static files
    app.use(express.static('static'));
    app.use('/static', express.static('static'));
    app.use('/static', express.static(__dirname + '/static'));
};

