var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var EmbryosSchema = new mongoose.Schema({
    _id: String,
    name: {type: String, default: ""},
    description: {type: String, default: ""},
    buy_price: {type: Number, default: 0},
    sizes: [
        {
            name: {type: String, unique: true},
            description: {type: String, default: ""},
            buy_price: {type: Number, default: 0},
            amount: {type: Number, default: 0},
            dim: {
                height_min: {type: Number, default: 0},
                height_max: {type: Number, default: 0},
                weight_min: {type: Number, default: 0},
                weight_max: {type: Number, default: 0},
            }
        }
    ],
}, {timestamps: true});

EmbryosSchema.plugin(uniqueValidator, 'is already exist.');

EmbryosSchema.methods.getDoSomething = function() {
}

mongoose.model('Embryos', EmbryosSchema);