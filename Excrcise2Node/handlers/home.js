const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');

function homeHandler(req, res) {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/' || req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/home.html'));

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

            res.write(data);
            res.end();
        })
    } else {
        return true;
    }
}

module.exports = homeHandler;