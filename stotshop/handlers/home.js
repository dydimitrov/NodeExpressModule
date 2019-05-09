const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

function homeHandler(req, res) {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/' || req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'content-type': 'text/plain'
                });
                res.write(data);
                res.end();
                return;
            }
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            let queryData = qs.parse(url.parse(req.url).query);
            Product.find().then((products)=>{
                if (queryData.query){
                    products = products.filter(product => product.name.toLowerCase().includes(queryData.query))
                }

                let content = '';
                for (const product of products) {
                    content += `<div class="product-card">
                     <img class="product-card" src="${product.image}">
                     <h2>${product.name}</h2>
                     <p>${product.description}</p>
                    </div>`
                }

                let html = data.toString().replace('{content}', content);
                res.write(html);
                res.end();
            });
        })
    } else {
        return true;
    }
}

module.exports = homeHandler;