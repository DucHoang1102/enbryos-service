var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    slug            = require('slug');

var EmbryosSchema = new mongoose.Schema({
    id: {type: String, required: true, uppercase: true, unique: true, trim: true},
    name: {type: String, default: ""},
    description: {type: String, default: ""},
    sizes: [
        {
            name: {type: String, uppercase: true, required: true, index: true, trim: true},
            description: {type: String, default: ""},
            buy_price: {type: Number, min: 0, default: 0},
            amount: {type: Number, min: 0, default: 0},
            dim: {
                height_min: {type: Number, min: 0, default: 0},
                height_max: {type: Number, min: 0, default: 0},
                weight_min: {type: Number, min: 0, default: 0},
                weight_max: {type: Number, min: 0, default: 0},
            }
        }
    ],
}, {timestamps: true}); 

EmbryosSchema.plugin(uniqueValidator, 'is already exist.');

// Check list sizes of req.body.embryos.sizes is unique
var checkSizesUnique = function(embryos) {
    var list = embryos.sizes;
    var listSize = [];

    if (list && list.length >= 1) {
        for(let i = 0; i < list.length; i++) {
            if (!listSize.includes(list[i].name)) {
                listSize.push(list[i].name);
            }
            else {
                throw embryos.invalidate('Sizes.name', 'Error, expected `{PATH}` to be unique. Value: `{VALUE}`', list[i].name, 'unique');
                break;
            }
        }
    }
}

// Code say:
var checkIdCharmap = function(embryos) {
    if(embryos.id) {
        var id = embryos.id.toString().trim().toUpperCase();

        if( id !== slug( id, {replacement: '', remove: /[-_.]/g} ) )
            throw embryos.invalidate('id', 'Error, `{PATH}` cannot contain space and charmaps. Value: `{VALUE}`', id, 'unique');
    }
}


EmbryosSchema.pre('save', function(next) {
    checkSizesUnique(this);
    checkIdCharmap(this);

    next();
});

module.exports = mongoose.model('Embryos', EmbryosSchema);