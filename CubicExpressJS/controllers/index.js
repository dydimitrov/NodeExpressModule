const home = require('./homeController');
const user = require('./userController');
const cube = require('./cubeController');
const accessory = require('./accessoryController');
const error = require('./errorController');

module.exports = {
    home,
    user,
    cube,
    accessory,
    error
};