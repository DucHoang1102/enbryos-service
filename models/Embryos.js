var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var EmbryosSchema = new mongoose.Schema({
    id: {type: String, required: true, uppercase: true, unique: true},
    name: {type: String, default: null},
    description: {type: String, default: null},
    sizes: [
        {
            name: {type: String, uppercase: true, required: true, index: true},
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

console.log(EmbryosSchema.indexes());

EmbryosSchema.methods.checkSizeIsUniqueAndRequired = function (bodySize) {
    if (!bodySize.name) throw new Error('Size name is `required`');

    var nameSize = bodySize.name.toString().trim().toUpperCase();

    if (nameSize) {
        for( let size of this.sizes ) {
            if (size.name === nameSize) 
                throw new Error('Size name is `unique`');
        }
        return true;
    }
    else {
        var error = new Error('Size name is `required`');
        console.log(error);
        throw new Error('Size name is `required`');
    }
};

module.exports = mongoose.model('Embryos', EmbryosSchema);