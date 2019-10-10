const controllers = require('../controllers/index');
const auth = require('../config/auth');

module.exports = (app) => {
    app.get('/', controllers.homeController.getHome);

    app.get('/register', controllers.userController.getRegister);
    app.post('/register', controllers.userController.postRegister);

    app.get('/login', controllers.userController.getLogin);
    app.post('/login', controllers.userController.postLogin);

    app.get('/user/logout',auth.isAuthenticated, controllers.userController.logout);

    app.get('/about', controllers.homeController.getAbout);

    app.get('/create/accessory',auth.isAuthenticated, controllers.accessoryController.getCreate);
    app.post('/create/accessory',auth.isAuthenticated, controllers.accessoryController.postCreate);

    app.get('/create',auth.isAuthenticated, controllers.productsController.getCreate);
    app.post('/create',auth.isAuthenticated, controllers.productsController.postCreate);

    app.get('/details/:id',auth.isAuthenticated, controllers.productsController.getDetails);

    app.get('/edit/:id',auth.isAuthenticated, controllers.productsController.getEdit);
    app.post('/edit/:id',auth.isAuthenticated, controllers.productsController.postEdit);

    app.get('/delete/:id',auth.isAuthenticated, controllers.productsController.getDelete);
    app.post('/delete/:id',auth.isAuthenticated, controllers.productsController.postDelete);

    app.get('/attach/accessory/:id', controllers.accessoryController.getAttach);
    app.post('/attach/accessory/:id', controllers.accessoryController.postAttach);

    app.all('*', controllers.errorController.getError);
};