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
        Accessory.find().then((accessory) =>{
            accessory = accessory.filter(acc => !acc.cubes.includes(id));
                res.render('accessory/attach', {cube:cube, accessories: accessory});
        });
    });
}

function postAttach(req,res){
    var id = req.params.id;

    Cube.findById(id).then((cube) => {
        Accessory.findById(req.body.accessory).then(acc => {
            acc.cubes.push(id);
            acc.save();
            cube.accessories.push(acc._id);
            cube.save();
        });
        res.redirect('/')
    });
}

module.exports = {
    getCreate,
    postCreate,
    getAttach,
    postAttach
};