const controllers = require('../controllers');
const restrictedPages = require('./auth');

// restrictedPages.hasRole('Admin') use this as second parameter in routes for auth restrictions

module.exports = app => {
    app.get('/', controllers.home.getIndex);

    app.get('/about', controllers.home.getAbout);

    app.get('/register', controllers.user.getRegister);
    app.post('/register', controllers.user.postRegister);

    app.get('/login', controllers.user.getLogin);
    app.post('/login', controllers.user.postLogin);

    app.post('/logout', controllers.user.logout);

    app.get('/create/accessory',restrictedPages.isAuthed, controllers.accessory.getCreate);
    app.post('/create/accessory',restrictedPages.isAuthed, controllers.accessory.postCreate);

    app.get('/create',restrictedPages.isAuthed, controllers.cube.getCreate);
    app.post('/create',restrictedPages.isAuthed, controllers.cube.postCreate);

    app.get('/details/:id', controllers.cube.getDetails);

    app.get('/edit/:id',restrictedPages.isAuthed, controllers.cube.getEdit);
    app.post('/edit/:id',restrictedPages.isAuthed, controllers.cube.postEdit);

    app.get('/delete/:id',restrictedPages.isAuthed, controllers.cube.getDelete);
    app.post('/delete/:id',restrictedPages.isAuthed, controllers.cube.postDelete);

    app.get('/attach/accessory/:id',restrictedPages.isAuthed, controllers.accessory.getAttach);
    app.post('/attach/accessory/:id',restrictedPages.isAuthed, controllers.accessory.postAttach);

    app.get('/error/400',controllers.error.getError);
    app.get('/error/500',controllers.error.getError500);
    app.all('*', controllers.error.getError);
};