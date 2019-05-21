const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
    let filePath = path.normalize(path.join(__dirname, `../views/products/add.html`));

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        Category.find().then((categories) => {
            let replacment = '<select class="input-field" name="category">';
            for (let category of categories) {
                replacment += `<option value="${category.id}">${category.name}</option>`;
            }
            replacment += '</select>';

            let html = data.toString().replace('{categories}', replacment);
            res.writeHead(200, {
                'content-type': 'text-html'
            });
            res.write(html);
            res.end();
        });
    });
};

module.exports.addPost = (req,res) =>{
    let productObj = req.body;
    productObj.image = '\\' + req.file.path;

    Product.create(productObj).then((product) => {
        Category.findById(product.category).then(category => {
            category.products.push(product._id);
            category.save();
        });
        res.redirect('/')
    })
};
