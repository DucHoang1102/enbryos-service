var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    slug            = require('slug');

var EmbryosSchema = new mongoose.Schema({
    id         : { type: String, required: true, uppercase: true, unique: true, trim: true },
    name       : { type: String, default: "" },
    description: { type: String, default: "" },
    sizes      : [
        {
            name       : { type: String, uppercase: true, required: true, index: true, trim: true },
            description: { type: String, default: "" },
            buy_price  : { type: Number, min: 0, default: 0 },
            amount     : { type: Number, min: 0, default: 0 },
            dim        : {
                height_min: {type: Number, min: 0, default: 0 },
                height_max: {type: Number, min: 0, default: 0 },
                weight_min: {type: Number, min: 0, default: 0 },
                weight_max: {type: Number, min: 0, default: 0 },
            }
        }
    ],
}, { timestamps: true } ); 

EmbryosSchema.plugin(uniqueValidator, 'is already exist.');

/*
 * Validation custom
 * 
 * path `id`
 * path `sizes.name`
 */

EmbryosSchema.path('id').validate(function(id) {
    return id === slug( id, {replacement: '', remove: /[-_.]/g} );
}, 'Error, `{PATH}` cannot contain space and charmaps. Value: `{VALUE}`');

EmbryosSchema.path('sizes').validate(function(sizes) {
    var listTemp = [];

    for (let size of sizes)
    {
        if (!listTemp.includes(size.name)) {
            listTemp.push(size.name);
        }
        else {
            throw Error('Error, expected `Sizes.name` to be unique. Value: `' + size.name + '`');
            break;
        }
    }

    return true;
});

module.exports = mongoose.model('Embryos', EmbryosSchema);