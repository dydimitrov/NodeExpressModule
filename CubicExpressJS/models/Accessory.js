const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    imageUrl: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    description:{type: mongoose.SchemaTypes.String},
    cubes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cube' }],
});

const Accessory = mongoose.model('Accessory', userSchema);

module.exports = Accessory;



