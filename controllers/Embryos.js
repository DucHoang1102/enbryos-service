var mongoose = require('mongoose'),
    Embryos = mongoose.model('Embryos');

exports.index = function (req, res, next) {
    return res.json({
        status: 'Embryos Service Api',
        message: 'Welcome'
    });
};

exports.view = function (req, res, next) {
    return res.send('Ok');
};

exports.new = function (req, res, next) {
    var embryos = new Embryos(req.body.embryos);

    return embryos.save().then(results => {
        return res.json({
            embryos: results
        });
    }).catch(err => {
        return res.json({
            errors: err
        });
    });
};

exports.details = function (req, res, next) {
};

exports.update = function (req, res, next) {
};

exports.delete = function (req, res, next) {
};
