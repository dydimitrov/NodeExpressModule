const fs = require('fs');
const path = require('path');
const url = require('url');
const mimeTypes = {
    'css':'text/css',
    'ico':'image/x-icon',
    'png':'image/png',
    'js':'application/javascript'
};
function getContentType(pathName) {
    if (pathName.endsWith('css')){
        return mimeTypes.css
    } else if (pathName.endsWith('ico')){
        return mimeTypes.ico
    } else if(pathName.endsWith('png')){
        return mimeTypes.png
    }else if (pathName.endsWith('js')){
        return mimeTypes.js
    }
}

function staticHandler (req,res){
    req.pathname = req.pathname || url.parse(req.url).pathname;
    
    if (req.pathname.startsWith('/content/') && req.method === 'GET'){
        let filePath = path.normalize(path.join(__dirname, `..${req.pathname}`));
        fs.readFile(filePath,(err,data)=>{
            if (err){
                res.writeHead(404, {
                    'content-type':'text/plain'
                });
                res.write('Resource not found!');
                res.end();
                return;
            }
            res.writeHead(200, {
                'content-type': 'text/css'
            });
            res.write(data);
            res.end();
        })
    } else{
        return true;
    }
}

module.exports = staticHandler;