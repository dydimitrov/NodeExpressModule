const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const database = require('./config/database.config');
const app = require('express')();

database(config);
require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));