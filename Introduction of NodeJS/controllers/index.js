const homeController = require('./home');
const filesController = require('./static-files');
const catsController = require('./cat');

module.exports = [
    filesController,
    homeController,
    catsController
];