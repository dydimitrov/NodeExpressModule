const fs = require('fs');
const Cube = require('../../models/Cube');
const Accessory = require('../../models/Accessory');

function getCreate (req, res){
    res.render('products/create');
}

function postCreate(req,res){
    let productObj = req.body;
    productObj.creatorId = req.user._id;

    Cube.create(productObj).then((product) => {console.log(product)});
    res.redirect('/');
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

function getEdit (req, res){
    var id = req.params.id;
    Cube.findById(id).then(cube => {
        if (!cube) {
            res.sendStatus(404);
            return;
        }
        Accessory.find().then(acc =>{
            acc = acc.filter(acc => acc.cubes.includes(id));
            res.render('products/edit', {cube:cube, accessories: acc});

        });
    });
}

function postEdit (req, res){
    var id = req.params.id;
    let updatedProduct = req.body;


    Cube.findById(id).then(cube =>{
        cube.name = updatedProduct.name;
        cube.description = updatedProduct.description;
        cube.imageUrl = updatedProduct.imageUrl;
        cube.difficultyLevel = updatedProduct.difficultyLevel;
        cube.save();
    });
    res.redirect(`/details/${id}`);
}

function getDelete (req, res){
    var id = req.params.id;
    Cube.findById(id).then(cube => {
        if (!cube) {
            res.sendStatus(404);
            return;
        }
        res.render('products/delete', {cube:cube});
    });
}

function postDelete (req, res){
    var id = req.params.id;
    Cube.findByIdAndRemove(id).then(res.redirect('/'));
}

module.exports = {
    getCreate,
    getDetails,
    postCreate,
    getEdit,
    postEdit,
    getDelete,
    postDelete
};