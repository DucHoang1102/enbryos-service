var mongoose = require('mongoose'),
    Embryos = mongoose.model('Embryos');

exports.view = function (req, res, next) {
};

exports.new = function (req, res, next) {
    Embryos.findOne({ id: req.params.id }).exec().then(embryos => {
        if (!embryos) return res.json({ embryos: null });

        if (embryos.checkSizeIsUniqueAndRequired(req.body.size)) {
            Embryos.findOneAndUpdate(
                { id: req.params.id }, 
                {$push: {sizes: req.body.size}}, 
                { new: true }, 
                (err, embryos) => {
                    return res.json({ sizes: embryos.sizes });
            });
        }

    }).catch(err => {
        return res.json({ errors: err.message });
    });
};

exports.details = function (req, res, next) {
};

exports.update = function (req, res, next) {
};

exports.delete = function (req, res, next) {
};
