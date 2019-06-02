var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var EmbryosSchema = new mongoose.Schema({
    _id: {type: String, required: true, uppercase: true},
    name: {type: String, default: null},
    description: {type: String, default: null},
    buy_price: {type: Number, default: null},
    sizes: [
        {
            name: {type: String, uppercase: true},
            description: {type: String, default: null},
            buy_price: {type: Number, default: null},
            amount: {type: Number, default: null},
            dim: {
                height_min: {type: Number, default: null},
                height_max: {type: Number, default: null},
                weight_min: {type: Number, default: null},
                weight_max: {type: Number, default: null},
            }
        }
    ],
}, {timestamps: true}); 

EmbryosSchema.plugin(uniqueValidator, 'is already exist.');

EmbryosSchema.methods.checkSizeEmbryosUnique = function(size) {
    var error = new Error();

    if (!size.name) {
        error.message = "Field: `name` is empty or undefined";
        throw error;
    }

    for(let s of this.sizes) {
        if (size.name.toUpperCase() === s.name) {
            error.message = "Field: `name` is unique";
            throw error;
            break;
        }
    }

    return 1;
};

EmbryosSchema.methods.getSizeEmbryos = function() {
    return {
        sizes: this.sizes
    };
};

mongoose.model('Embryos', EmbryosSchema);