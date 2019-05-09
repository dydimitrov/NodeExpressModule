const url = require('url');
const database = require('../config/database');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

function movieDetails(req, res) {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname.startsWith('/movies/details') && req.method === 'GET') {

        let movieId = req.pathname.split('/').splice(-1).map(x => Number(x))[0];
        let movie = database.products.getById(movieId)[0];

        let filePath = path.normalize(path.join(__dirname, `../views/details.html`));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, {
                    'content-type': 'text-html'
                });
                let content = `<div class="content">
            <img src="${movie.moviePoster}" alt=""/>
            <h3>Title  ${movie.movieTitle}</h3>
            <h3>Year ${movie.movieYear}</h3>
            <p> ${movie.movieDescription}</p>
            </div>`;
                let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',content);
                res.write(html);
                res.end();
            }
        });
    } else {
        return true;
    }
}

module.exports = movieDetails;
