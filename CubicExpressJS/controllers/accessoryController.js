const fs = require('fs');
const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

function getCreate(req, res) {
    res.render('accessory/create');
}

function postCreate(req, res) {
    let accessoryObj = req.body;

    Accessory.create(accessoryObj)
        .then(res.redirect('/'))
        .catch(err => {if (err){res.redirect('error/500')} });
}

function getAttach(req, res, next) {
    const {id: cubeId} = req.params;
    Cube.findById(cubeId).then(
        cube => Promise.all([cube, Accessory.find({cubes: {$nin: [cubeId]}})])
    ).then(([cube, filterAccessories]) => {
        res.render('accessory/attach', {
            cube,
            accessories: filterAccessories.length > 0 ? filterAccessories : null
        });
    }).catch(err =>{
        if (err){
            res.redirect('error/500');
        }
    });
}

function postAttach(req, res, next) {
    const {id} = req.params;
    const {accessory: accessoryId} = req.body;
    Promise.all([
        Cube.update({_id: id}, {$push: {accessories: accessoryId}}),
        Accessory.update({_id: accessoryId}, {$push: {cubes: id}})
    ])
        .then(() => {
            res.redirect('/');
        })
        .catch(err =>{
            if (err){
                res.redirect('error/500');
            }
        });
}

module.exports = {
    getCreate,
    postCreate,
    getAttach,
    postAttach
};