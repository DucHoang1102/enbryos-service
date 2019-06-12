var mongoose = require('mongoose'),
    dotenv   = require('dotenv').config({path: './.env'});

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});

require('../index');

var Embryos = mongoose.model('Embryos');

var datas = [];

for (let i = 1; i < 22; i++) {
    var data = {
        'id': 'CT' + i.toString(),
        'name': 'Áo cộc tay: CT' + i.toString(),
        'sizes': [
            {'name': 'S'},
            {'name': 'M'}
        ]
    }

    var embryos = new Embryos(data);

    embryos.save().then().catch(err => {
        console.log(err.message);
    });
}

setTimeout(function(){
    mongoose.connection.close();
}, 1000);