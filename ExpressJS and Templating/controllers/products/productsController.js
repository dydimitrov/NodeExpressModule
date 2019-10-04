const fs = require('fs');
const Cube = require('../../models/Cube');
const Accessory = require('../../models/Accessory');

function getCreate (req, res){
    res.render('products/create');
}

function getDetails (req, res){
    var id = req.params.id;
    Cube.findById(id).then(cube => {
        if (!cube) {
            res.sendStatus(404);
            return;
        }
        Accessory.find().then(acc =>{
            acc = acc.filter(acc => acc.cubes.includes(id));
            res.render('products/details', {cube:cube, accessories: acc});

        });
    });
}

function postCreate(req,res){
    let productObj = req.body;

    Cube.create(productObj).then((product) => {console.log(product)});
    res.redirect('/');
}

module.exports = {
    getCreate,
    getDetails,
    postCreate
};