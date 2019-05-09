const url = require('url');
const database = require('../config/database');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

function viewAll(req, res) {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/viewAllMovies' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, `../views/viewAll.html`));
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, {
                    'content-type': 'text-html'
                });
                let movies = database.products.getAll();
                let content = '';
                for (let movie of movies) {
                    content += `<div class="movie" id="${movie.id}">
                            <a href="/movies/details/${movie.id}"><img class="moviePoster" src="${movie.moviePoster}"/></a>
                            <a href="/movies/details/${movie.id}" class="button">Click here for Details</a>
                            </div>`;
                }
                let html = data.toString().replace('{{replaceMe}}',content);

                res.write(html);
                res.end();
            }

        });
    } else {
        return true;
    }
}

module.exports = viewAll;
