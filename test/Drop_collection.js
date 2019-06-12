var mongoose  = require('mongoose');

setTimeout(function(){
    mongoose.connect('mongodb://localhost/embryos', {useNewUrlParser: true});
    mongoose.connection.dropCollection('embryos', function(err, results){
        if (results) console.log('Drop collection success');
        mongoose.connection.close();
    });
},1000);
