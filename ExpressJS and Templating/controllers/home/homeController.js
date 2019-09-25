const fs = require('fs');

function getHome (req, res) {
    var db = JSON.parse(fs.readFileSync('./config/database.json'));

    res.render('home/index',{db});
};

function getAbout (req, res){
    res.render('home/about');
};

module.exports = {
    getHome,
    getAbout
};