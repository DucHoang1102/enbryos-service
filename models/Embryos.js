var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var EmbryosSchema = new mongoose.Schema({
    id: {type: String, required: true, uppercase: true, unique: true, trim: true},
    name: {type: String, default: null},
    description: {type: String, default: null},
    sizes: [
        {
            name: {type: String, uppercase: true, required: true, index: true, trim: true},
            description: {type: String, default: null},
            buy_price: {type: Number, min: 0, default: null},
            amount: {type: Number, min: 0, default: null},
            dim: {
                height_min: {type: Number, min: 0, default: null},
                height_max: {type: Number, min: 0, default: null},
                weight_min: {type: Number, min: 0, default: null},
                weight_max: {type: Number, min: 0, default: null},
            }
        }
    ],
}, {timestamps: true}); 

EmbryosSchema.plugin(uniqueValidator, 'is already exist.');

// Check list sizes of req.body.embryos.sizes
var checkSizesUnique = function(list) {
    var listSize = [];
    if (list.length >= 2) {
        for(let i = 0; i < list.length; i++) {
            if (!listSize.includes(list[i].name)){
                listSize.push(list[i].name);
            }
            else {
                throw new Error('`name` is require in `sizes`');
                break;
            }
        }
    }
}

EmbryosSchema.pre('validate', function(next) {
    checkSizesUnique(this.sizes);

    next();
});

EmbryosSchema.pre('findOneAndUpdate', function(next){
    console.log(this._update.sizes);
    checkSizesUnique(this._update.sizes);

    next();
});

module.exports = mongoose.model('Embryos', EmbryosSchema);