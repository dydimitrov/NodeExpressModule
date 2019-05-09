const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname,'/db.json');

module.exports.products = {};

function getProducts(){
    if (!fs.existsSync(dbPath)){
        fs.writeFileSync(dbPath,'[]');
        return [];
    }
    let json = fs.readFileSync(dbPath).toString() || '[]';
    return JSON.parse(json);
}

function saveProducts(products){
    let json = JSON.stringify(products);
    fs.writeFileSync(dbPath,json);
}

module.exports.products.getAll = getProducts;

module.exports.products.add =  (product) =>{
    let movies = getProducts();
    product.id = movies.length + 1;
    movies.push(product);
    saveProducts(movies);
};

module.exports.products.getById = (id) =>{
    return getProducts().filter(p => p.id === id)
};