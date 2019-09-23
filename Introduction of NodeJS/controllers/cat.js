"use strict";
const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds.json');
const cats = require('../data/cats.json');

module.exports = (req,res)=>{
    const pathname = req.pathname || url.parse(req.url).pathname;
    
    if (pathname === '/cats/add-cat' && req.method === 'GET'){
        let filePath = path.normalize(
            path.join(__dirname, '../views/addCat.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404,{
                    'Content-type':'text/plain'
                });
                res.write('404 not found');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-type': 'text/html'

            });
            let catBreedsPlaceHolder = breeds.map((breed)=>
                `<option value="${breed}">${breed}</option>`);

            let modifiedData = data.toString().replace('{{catBreeds}}',catBreedsPlaceHolder);
            res.write(modifiedData);
            res.end();
        });
    }

    else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/addBreed.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404,{
                    'Content-type':'text/plain'
                });
                res.write('404 not found');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-type': 'text/html'

            });
            res.write(data);
            res.end();
        });
    }

    else if(pathname === '/cats/add-cat' && req.method === 'POST'){
        var form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files)=> {
            if(err){
                console.log(err);
                res.writeHead(404,{
                    'Content-type':'text/plain'
                });
                res.write('Somthink goes wrong!');
                res.end();

            }

            addCat(req,res,fields,files);

            res.writeHead(302, {location: '/'});
            res.end();
        });
    }

    else if(pathname === '/cats/add-breed' && req.method === 'POST'){
        var form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files)=> {
            if(err){
                console.log(err);
                res.writeHead(404,{
                    'Content-type':'text/plain'
                });
                res.write('Somthink goes wrong!');
                res.end();

            }
            fs.readFile('./data/breeds.json',(err,data)=>{
                if(err){
                    console.log(err)
                }
                var text = JSON.parse(data);
                text.push(fields.breed);
                fs.writeFileSync('./data/breeds.json', JSON.stringify(text));
                res.writeHead(302, {location: '/'});
                res.end();
            });
        });
    }

    else if (pathname.includes('/cats/edit') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/editCat.html')
        );

        var urlArray = req.pathname.split('/');
        var catId = urlArray[urlArray.length-1];

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404,{
                    'Content-type':'text/plain'
                });
                res.write('404 not found');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-type': 'text/html'

            });

            var cats = JSON.parse(fs.readFileSync('./data/cats.json','utf8'));

            let breedsPlacehoder = breeds.map((breed)=>
                `<option value="${breed}">${breed}</option>`).toString();

            let catPlaceHolder = cats.filter(cat => cat.id == catId).map((cat)=>
                `<h2>Edit Cat</h2>
                 <label for="name">Name</label>
                 <input type="text" id="name" value="${cat.name}">
                 <label for="description">Description</label>
                 <textarea id="description">${cat.description}</textarea>
                 <label for="image">Image</label>
                 <input type="file" id="image">
                 <input type="hidden" id="${cat.id}">
                 <label for="group">Breed</label>
                 <select id="group">
                     ${breedsPlacehoder}
                 </select>
                 <button type="submit">Edit Cat</button>`);

            let modifiedData = data.toString().replace('{{catPlaceHolder}}',catPlaceHolder);

            res.write(modifiedData);
            res.end();
        });
    }

    else if (pathname.includes('/cats/find-new-home') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/catShelter.html')
        );

        var urlArray = req.pathname.split('/');
        var catId = urlArray[urlArray.length-1];

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404,{
                    'Content-type':'text/plain'
                });
                res.write('404 not found');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-type': 'text/html'

            });
            var cats = JSON.parse(fs.readFileSync('./data/cats.json','utf8'));

            let catShelterPlaceHolder = cats.filter(cat => cat.id == catId).map((cat)=>
                `<img src="/content/images/${cat.image}" alt="${cat.name}">
            <label for="name">Name</label>
            <input type="text" id="name" value="${cat.name}" disabled>
            <label for="description">Description</label>
            <textarea id="description" disabled>${cat.description}</textarea>
            <label for="group">Breed</label>
            <select id="group" disabled>
                <option value="${cat.breed}">${cat.breed}</option>
            </select>
            <input type="hidden" id="${cat.id}">
            <button type="submit">SHELTER THE CAT</button>`);

            let modifiedData = data.toString().replace('{{catShelterPlaceHolder}}',catShelterPlaceHolder);

            res.write(modifiedData);
            res.end();
        });
    }

    else if (pathname.includes('/cats-edit') && req.method === 'POST') {
        var form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files)=> {
            if(err){
                console.log(err);
                res.writeHead(404,{
                    'Content-type':'text/plain'
                });
                res.write('Somthink goes wrong!');
                res.end();

            }
            var catId = fields.id;
            removeCat(catId);
            addCat(req,res);
            res.writeHead(302, {location: '/'});
            res.end();
        });
    }

    else if (pathname.includes('/cats/find-new-home') && req.method === 'POST') {
       //todo implement logic for post request to change home of cat
    }
    else {
        return true;
    }
};

function removeCat(id) {
    var catsArray = JSON.parse(fs.readFileSync('./data/cats.json'));
    catsArray.splice(x => x.id === id,1);
    fs.writeFileSync('./data/cats.json', JSON.stringify(catsArray));
}

function addCat(req,res, fields, files) {
    //type the standart path to uploaded image
    let oldPath = files.upload.path;
    let newPath = path.normalize( path.join(__dirname, '../content/images/' + files.upload.name));

    //copy and then delete the old file becouse fs.renameSync doesnt work
    fs.copyFileSync(oldPath, newPath);
    fs.unlinkSync(oldPath);

    var cats = JSON.parse(fs.readFileSync('./data/cats.json','utf8'));
    cats.push({
        id: cats.length+1,
        name: fields.name,
        description:fields.description,
        breed: fields.breed,
        image: files.upload.name
    });

    fs.writeFileSync('./data/cats.json', JSON.stringify(cats));
}