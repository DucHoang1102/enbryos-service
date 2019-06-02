var mongoose = require('mongoose'),
    Embryos = mongoose.model('Embryos');

exports.view = function (req, res, next) {
};

exports.new = function (req, res, next) {
    Embryos.findById(req.params.id).exec().then(embryos => {
        if (!embryos) return res.json({embryos: null});

        embryos.checkSizeEmbryosUnique(req.body.size);

        embryos.update(
            { $push: { sizes: req.body.size } },
            { new: true }
        ).exec().then(results => {
            console.log(results);
            return res.json({
                embryos: results
            });
        }).catch(err => {
            return res.json({
                errors: err
            });
        });

    }).catch(err => {
        return res.json({
            errors: err
        });
    });

    // Embryos.findById(req.params.id).exec().then(embryos => {
    //     if (!embryos) return res.json()

    //     embryos.checkSizeUnique(req.body.size);
    // }).catch(err => {
    //     return res.json( { errors: err } );
    // });

    // Embryos.findOneAndUpdate(
    //     { _id: req.params.id }, 
    //     { $push: { sizes: req.body.size } },
    //     { new: true }

    // ).exec().then(results => {
    //     return res.json( { size: results.sizes } );

    // }).catch(err => {
    //     return res.json( { errors: err } );
    // });

    // Embryos.findById(req.params.id).exec().then(embryos => {
    //     if (embryos) {
    //         embryos.sizes.push(req.body.size);

    //         embryos.save().then(results => {
    //             return res.json({
    //                 sizes: embryos.sizes
    //             });
    //         }).catch(err => {
    //             return res.json({
    //                 errors: err
    //             });
    //         });
    //     } 
    //     else {
    //         return res.json({
    //             embryos: embryos
    //         })
    //     }
    // }).catch(err => {
    //     return res.json({
    //         errors: err
    //     });
    // });
};

exports.details = function (req, res, next) {
};

exports.update = function (req, res, next) {
};

exports.delete = function (req, res, next) {
};
