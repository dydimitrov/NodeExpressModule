const fs = require('fs');
const qs = require('querystring');
const Cube  = require('../../models/Cube');
const Accessory = require('../../models/Accessory');

function getHome (req, res) {
    Cube.find().then((db) => {
        res.render('home/index', {db})
    });
};

function getAbout (req, res){
    res.render('home/about');
};

module.exports = {
    getHome,
    getAbout
};