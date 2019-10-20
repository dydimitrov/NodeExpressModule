const Cube = require('../models/Cube');

function getIndex(req, res) {
    Cube.find().populate('accessories').then((db) => {
        res.render('home/index', {db})
    });
}
function getAbout(req, res){
    res.render('home/about');
}

module.exports = {
    getIndex,
    getAbout
};