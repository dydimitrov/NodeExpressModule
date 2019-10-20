const fs = require('fs');
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

function getCreate(req, res) {
    res.render('products/create');
}

function postCreate(req, res) {
    const {name = null, description = null, imageUrl = null, difficultyLevel = null} = req.body;
    const {user} = req;

    Cube.create({name, description, imageUrl, difficultyLevel, creatorId: user._id}).then(cube => {
        res.redirect('/');

    }).catch(err => {
        if (err) {
            console.log(err);
            res.locals.globalError = 'Name of the cube must be between 2 and 10 symbols!';
            res.render('products/create');
        }
    });

}

async function getDetails(req, res, next) {
    const id = req.params.id;
    const user = req.user;
    try {
        const cube = await Cube.findById(id).populate('accessories');
        if (!cube) {
            res.redirect('error/404');
            return;
        }
        res.render(`products/details`, {cube, accessories: cube.accessories});
    } catch (err) {
        res.redirect('error/500');
    }
}

function getEdit(req, res) {
    const id = req.params.id;
    const user = req.user;
    Cube.findOne({_id: id, creatorId: user._id}).then(cube => {
        const accessories = [
            {title: '1 - Very Easy', selected: 1 === cube.difficultyLevel},
            {title: '2 - Easy', selected: 2 === cube.difficultyLevel},
            {title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel},
            {title: '4 - Intermediate', selected: 4 === cube.difficultyLevel},
            {title: '5 - Expert', selected: 5 === cube.difficultyLevel},
            {title: '6 - Hardcore', selected: 6 === cube.difficultyLevel}
        ];
        res.render('products/edit', {cube, accessories});
    }).catch(err => {
        if (err) {
            res.redirect('error/500');
        }
    });
}

function postEdit(req, res) {
    const id = req.params.id;
    const {name = null, description = null, imageUrl = null, difficultyLevel = null} = req.body;
    Cube.updateOne({_id: id}, {name, description, imageUrl, difficultyLevel}).then(cube => {
        res.redirect('/');
    }).catch(err => {
        if (err) {
            res.redirect('error/500');
        }
    });
}

function getDelete(req, res, next) {
    const id = req.params.id;
    const user = req.user;
    Cube.findOne({_id: id, creatorId: user._id}).then(cube => {
        const accessories = [
            {title: '1 - Very Easy', selected: 1 === cube.difficultyLevel},
            {title: '2 - Easy', selected: 2 === cube.difficultyLevel},
            {title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel},
            {title: '4 - Intermediate', selected: 4 === cube.difficultyLevel},
            {title: '5 - Expert', selected: 5 === cube.difficultyLevel},
            {title: '6 - Hardcore', selected: 6 === cube.difficultyLevel}
        ];
        res.render('products/delete', {cube, accessories});
    }).catch(err => {
        if (err) {
            res.redirect('error/500');
        }
    });
}

function postDelete(req, res, next) {
    const id = req.params.id;
    const {user} = req;

    Cube.deleteOne({_id: id, creatorId: user._id})
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            res.redirect('error/500')
        });
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