const controllers = require('../controllers/index');

module.exports = (app) => {
    app.get('/', controllers.homeController.getHome);

    app.get('/about', controllers.homeController.getAbout);

    app.get('/create/accessory', controllers.accessoryController.getCreate);
    app.post('/create/accessory', controllers.accessoryController.postCreate);

    app.get('/create', controllers.productsController.getCreate);
    app.post('/create', controllers.productsController.postCreate);

    app.get('/details/:id', controllers.productsController.getDetails);

    app.get('/attach/accessory/:id', controllers.accessoryController.getAttach);
    app.post('/attach/accessory/:id', controllers.accessoryController.postAttach);

    app.all('*', controllers.errorController.getError);
};