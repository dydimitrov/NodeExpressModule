const url = require('url');
const database = require('../config/database');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

function addMovieHandler(req,res){
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/addMovie' && req.method === 'GET'){
        let filePath = path.normalize(path.join(__dirname, `../views/addMovie.html`));

        fs.readFile(filePath, (err,data) => {
            if (err){
                console.log(err);
            }else{
                res.writeHead(200, {
                    'content-type':'text-html'
                });
                res.write(data);
                res.end();
            }

        });
    }
    else if(req.pathname === '/addMovie' && req.method === 'POST'){
        let dataString = '';

        req.on('data', (data)=>{
            dataString+=data;
        });

        req.on('end',()=>{
            let product = qs.parse(dataString);
            
            if (!product.movieTitle || !product.moviePoster) {
                let filePath = path.normalize(path.join(__dirname, `../views/addMovie.html`));

                fs.readFile(filePath, (err,data) => {
                    if (err){
                        console.log(err);
                    }else{
                        res.writeHead(200, {
                            'content-type':'text-html'
                        });
                        let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>','<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>')
                        res.write(html);
                        res.end();
                    }

                });
            }else{
                database.products.add(product);
                let filePath = path.normalize(path.join(__dirname, `../views/addMovie.html`));

                fs.readFile(filePath, (err,data) => {
                    if (err){
                        console.log(err);
                    }else{
                        res.writeHead(200, {
                            'content-type':'text-html'
                        });
                        let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>','<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>');
                        res.writeHead(200, {
                            'content-type':'text-html'
                        });
                        res.write(html);
                        res.end();
                    }
                });
            }

        })
    }
    else{
        return true;
    }
}
module.exports = addMovieHandler;
