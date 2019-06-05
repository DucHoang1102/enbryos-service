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

module.exports = mongoose.model('Embryos', EmbryosSchema);