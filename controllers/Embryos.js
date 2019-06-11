var mongoose = require('mongoose'),
    Embryos = mongoose.model('Embryos');

exports.index = function (req, res, next) {
    return res.json({
        status: 'Embryos Service Api',
        message: 'Welcome'
    });
};

exports.view = function (req, res, next) {
    var limit = String(req.body.limit) || 20; // Why String()? Because case req.body.limit = 0 is Number
    var offset = String(req.body.offset) || 0;
    var query = req.body.query || {};
    var sort = req.body.sort || {createdAt: 'desc'};
    var select = req.body.select || '';

    var results = Embryos.find(query)
        .select(select)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sort)
        .exec();

    Promise.all([results]).then(results => {
        var embryos = results[0];

        return res.json({ embryos: results });
    }).catch(err => {
        return res.json({ errors: err.message });
    });
};

exports.new = function (req, res, next) {
    var embryos = new Embryos(req.body.embryos);

    return embryos.save().then(results => {
        return res.json({
            embryos: results
        });
    }).catch(err => {
        return res.json({
            errors: err.message
        });
    });
};

exports.details = function (req, res, next) {
    Embryos.findOne({ id: req.params.id }).exec().then(results => {
        if (!results) throw new Error('Embryos not found');

        return res.json({ embryos: results });
    }).catch(err => {
        return res.json({ errors: err.message });
    });
};

exports.update = function (req, res, next) {
    Embryos.findOne({ id: req.params.id }).then(embryos => {
        if (!embryos) throw new Error('Embryos not found');

        if (typeof req.body.embryos.id !== 'undefined') {
            embryos.id = req.body.embryos.id;
        }

        if (typeof req.body.embryos.name !== 'undefined') {
            embryos.name = req.body.embryos.name;
        }

        if (typeof req.body.embryos.description !== 'undefined') {
            embryos.description = req.body.embryos.description;
        }

        if (typeof req.body.embryos.sizes !== 'undefined' ) {
            embryos.sizes = req.body.embryos.sizes;
        }

        embryos.save().then(embryos => {
            return res.json({ embryos: embryos });
        }).catch(err => {
            return res.json({ errors: err.message });
        });

    }).catch(err => {
        return res.json({ errors: err.message });
    });
};

exports.delete = function (req, res, next) {
    Embryos.findOneAndRemove({ id: req.params.id }).exec().then(results => {
        if (!results) throw new Error('Embryos not found');

        return res.json({ embryos: results });
    }).catch(err => {
        return res.json({ errors: err.message });
    });
};
