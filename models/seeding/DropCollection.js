var mongoose = require('mongoose'),
    dotenv   = require('dotenv').config({path: './.env'});

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
mongoose.connection.dropCollection('embryos', function(err, results){
    if (results) console.log('Drop collection success');
    mongoose.connection.close();
});