const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// connect DB using compass online

module.exports = ()=>{
    mongoose.connect(
        'mongodb://localhost/movie',
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        }
        );
    mongoose.connection.on('open',()=>{
        console.log('connectd db');
    });
    mongoose.connection.on('error',(err)=>{
        console.log(`Connection failed ${err}`);
    });
    mongoose.Promise = global.Promise  
}
//mongodb+srv://otabek:otb1997mr@cluster0-1jbek.mongodb.net/test