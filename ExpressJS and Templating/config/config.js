const path = require('path');

module.exports = {
    development:{
        connectionString: 'mongodb://localhost:27017/CubicDB',
        port: process.env.PORT || 3333,
        rootPath: path.normalize(path.join(__dirname, '../'))
    },
    production:{

    }
};