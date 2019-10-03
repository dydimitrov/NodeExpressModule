const fs = require('fs');
const Cube = require('../../models/Cube');

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
        res.render('products/details', {cube:cube});
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