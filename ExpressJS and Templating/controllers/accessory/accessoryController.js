const fs = require('fs');
const Accessory = require('../../models/Accessory');
const Cube = require('../../models/Cube');

function getCreate(req,res) {
    res.render('accessory/create');
}

function postCreate(req,res){
    let accessoryObj = req.body;

    Accessory.create(accessoryObj).then((accessory) => {console.log(accessory)});
    res.redirect('/');
}

function getAttach(req,res) {
    var id = req.params.id;
    Cube.findById(id).then(cube => {
        if (!cube) {
            res.sendStatus(404);
            return;
        }
        res.render('accessory/attach', {cube:cube});
    });
}

function postAttach(req,res){
    res.redirect('/');
}

module.exports = {
    getCreate,
    postCreate,
    getAttach,
    postAttach
};