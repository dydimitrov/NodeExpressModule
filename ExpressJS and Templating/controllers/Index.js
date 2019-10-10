const homeController = require('./home/homeController');
const productsController = require('./products/productsController');
const accessoryController = require('./accessory/accessoryController');
const userController = require('./user/userController');
const errorController = require('./errorController');

module.exports = {
    homeController,
    productsController,
    accessoryController,
    userController,
    errorController
};