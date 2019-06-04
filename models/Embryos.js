var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var EmbryosSchema = new mongoose.Schema({
    _id: {type: String, required: true, uppercase: true, unique: true},
    name: {type: String, default: null},
    description: {type: String, default: null},
    sizes: [
        {
            name: {type: String, uppercase: true, required: true, unique: true},
            description: {type: String, default: null},
            buy_price: {type: Number, default: null, min: 0},
            amount: {type: Number, default: null, min: 0},
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

module.exports = mongoose.model('Embryos', EmbryosSchema);