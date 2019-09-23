const url = require('url');
const fs = require('fs');
const path = require('path');


module.exports = (req,res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404,{
                    'Content-type':'text/plain'
                });
                res.write('404 not found');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-type': 'text/html'

            });
            var cats = JSON.parse(fs.readFileSync('./data/cats.json','utf8'));
            let catPlaceHolder = cats.map((cat)=>
                `<li><img src="/content/images/${cat.image}" alt="${cat.name}"><h3></h3>
                 <p><span>Breed: </span>${cat.breed}</p>
                 <p><span>Description: </span>${cat.description}
                 <ul class="buttons">
                 <li class="btn edit"><a href="/cats/edit/${cat.id}">Change Info</a></li>
                 <li class="btn delete"><a href="/cats/find-new-home/${cat.id}">New Home</a></li>
                 </ul>
                 </li>`);

            let modifiedData = data.toString().replace('{{catPlaceHolder}}',catPlaceHolder);

            res.write(modifiedData);
            res.end();
        });
    }else {
        return true;
    }
};