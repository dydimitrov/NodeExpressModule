const fs = require('fs');

function getCreate (req, res){
    res.render('products/create');
}

function getDetails (req, res){
    var id = req.params.id;
    var db = JSON.parse(fs.readFileSync('./config/database.json')).filter(c => c.id !== id)[0];

    res.render('products/details', {db});
}

function postCreate(req,res){
    var db = JSON.parse(fs.readFileSync('./config/database.json'));

    let cube = req.body;
    cube.id = db.length+1;
    db.push(cube);

    fs.writeFileSync('./config/database.json',JSON.stringify(db));
    res.redirect('/');
}

module.exports = {
    getCreate,
    getDetails,
    postCreate
};