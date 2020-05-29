const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// movie schema for Movies
const MovieSchema = new Schema({
    directory_id:{
        type: mongoose.Types.ObjectId,
        required:true,
    },
    title:{
        type:String,
        required:true,
        minlength:[1,`{PATH} is min {MINLENGTH}`],
        maxlength:[100,`{PATH} is max {MAXLENGTH}`]
    },
    category:{
        type:String,
        required:true,
        minlength:[1,`{PATH} is min {MINLENGTH}`],
        maxlength:[65,`{PATH} is max {MAXLENGTH}`]
    },
    country:{
        type:String,
        required:true,
        minlength:[1,`{PATH} is min {MINLENGTH}`],
        maxlength:[5,`{PATH} is max {MAXLENGTH}`]
    },
    year:{
        type:Number,
        required:true,
    },
    imdb_score:{
        type:Number,
        required:true,
        min:[1,`{PATH} is min {MIN}`],
        max:[10,`{PATH} is max {MAX}`]
    },
    created_at:{
        type:Date,
        default: Date.now(),
        
    }
});
module.exports = mongoose.model('movie',MovieSchema);