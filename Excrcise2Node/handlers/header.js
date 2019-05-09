const url = require('url');
const database = require('../config/database');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');

function header(req, res) {
    if (req.headers.statusheader === 'Full') {
        let filePath = path.normalize(path.join(__dirname, '../views/status.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'content-type': 'text/plain'
                });
                res.write(data);
                res.end();
                return;
            }
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            let countOfMovies = database.products.getAll().length;
            let html = data.toString().replace('{{replaceMe}}',countOfMovies);
            res.write(html);
            res.end();
        })
    }else{
        return true;
    }
}

module.exports = header;