const homeController = require('./home/homeController');
const productsController = require('./products/productsController');
const accessoryController = require('./accessory/accessoryController');
const errorController = require('./errorController');

module.exports = {
    homeController,
    productsController,
    accessoryController,
    errorController
};