const homeHandler = require('./home');
const staticHandler = require('./static-files');
const addMovieHandler = require('./addMovie');
const viewAllHandler = require('./viewAllMovies');
const headerHandler = require('./header');
const detailsHandler = require('./movieDetails');

module.exports = [
    headerHandler,
    staticHandler,
    addMovieHandler,
    viewAllHandler,
    detailsHandler,
    homeHandler
];