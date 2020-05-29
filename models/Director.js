const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// shcema for directors
const DirectorSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:[1,`{PATH} is min 1`],
        maxlength:[5,`{PATH} is max 5`]
    },
    surname:{
        type:String,
        required:true,
        minlength:[1,`{PATH} is min 1`],
        maxlength:[5,`{PATH} is max 5`]
    },
    bio:{
        type:String,
        required:true,
        minlength:[1,`{PATH} is min 1`],
        maxlength:[255,`{PATH} is max 5`]
    }
});
module.exports = mongoose.model('director',DirectorSchema);