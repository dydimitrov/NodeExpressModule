const http = require('http');
const controllers = require('./controllers');

const port = 3000;

http.createServer((req, res) =>{
    for (let controller of controllers) {
        if (!controller(req,res)) {
            break;
        }
    }
}).listen(port);