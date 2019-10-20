const mongoose = require('mongoose');

let cubeSchema = mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        minlength:2,
        maxlength:10
    },
    imageUrl: {type: mongoose.SchemaTypes.String},
    description:{type: mongoose.SchemaTypes.String},
    difficultyLevel:{type: mongoose.SchemaTypes.Number},
    creatorId:{type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    accessories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Accessory'}],
});
let Cube = mongoose.model('Cube',cubeSchema);
module.exports = Cube;