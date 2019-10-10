const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
const propertyIsRequired = '{0} is required.';

let userSchema = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: propertyIsRequired.replace('{0}', 'Username'),
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: propertyIsRequired.replace('{0}', 'Password')
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;



