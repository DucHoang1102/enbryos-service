var assert = require('chai').assert;
var mongoose = require('mongoose');
var Embryos = require('../models/Embryos');

/*
 * `_id` field 
 */
var Test_id_is_required = function() {
    it('Test id is required', () => {
        var embryos = new Embryos( { _id: null } );
        var error = embryos.validateSync();

        assert.equal(error.errors['_id'].message, 'Path `_id` is required.')
    });
};

var Test_id_is_uppercase = function() {
    it('Test id is uppercase', () => {
        var embryos = new Embryos({_id: 'ct1'});

        assert.equal(embryos._id, 'CT1');
    });
}

var Test_id_is_unique = function() {
}

/*
 * `name` field
 * 
 * `name` is id of `sizes` field
 */

var Test_name_is_required = function() {
    it('Test name is required', () => {
        var embryos = new Embryos({
            _id: 'ct1',
            sizes: [ { name: null } ]
        });
        var error = embryos.validateSync();
        
        assert.equal(error.errors['sizes.0.name'].message, 'Path `name` is required.');
    });
}

var Test_name_is_uppercase = function() {
    it('Test name is uppercase', () => {
        var embryos = new Embryos({
            _id: 'ct1',
            sizes: [ { name: 's' } ]
        });

        assert.equal(embryos.sizes[0].name, 'S');
    });
}


/*
 * Run Test
 */
describe('Test Embryos Model', () => {
    Test_id_is_required();
    Test_id_is_uppercase();
    Test_id_is_unique();

    Test_name_is_required();
    Test_name_is_uppercase();
});