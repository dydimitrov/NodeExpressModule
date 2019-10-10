const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: {type: mongoose.SchemaTypes.String, required: true},
    description: {type: mongoose.SchemaTypes.String},
    imageUrl: {type: mongoose.SchemaTypes.String},
    description:{type: mongoose.SchemaTypes.String},
    difficultyLevel:{type: mongoose.SchemaTypes.Number},
    creatorId:{type: mongoose.SchemaTypes.String},
    accessories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Accessory', unique:true}],
});

let Cube = mongoose.model('Cube',productSchema);
module.exports = Cube;