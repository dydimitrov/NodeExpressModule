const controllers = require('../controllers/index');

module.exports = (app) => {
    app.get('/', controllers.homeController.getHome);

    app.get('/about', controllers.homeController.getAbout);

    app.get('/create', controllers.productsController.getCreate);
    app.post('/create', controllers.productsController.postCreate);

    app.get('/details/:id', controllers.productsController.getDetails);
    app.all('*', controllers.errorController.getError);
};