const path = require('path');

module.exports = {
    development:{
        connectionString: 'mongodb://localhost:27017/CatShelterDB',
        port: process.env.PORT || 3000,
        rootPath: path.normalize(path.join(__dirname, '../'))
    },
    production:{

    }
};