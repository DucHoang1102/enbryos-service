var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    dotenv    = require('dotenv').config({path: './.env'}),
    uriTest   = process.env.APP_URL + ':' + process.env.APP_PORT;

chai.use(chaiHttp);

/*
 * Test PUT: /api/embryos/:id
 */

var listData = [
  {
    it     : 'CASE: Embryos not found',
    id     : 'cdfsdfd11',
    send   : {},
    matched: {'errors': 'Embryos not found'}
  },
//-------------------------------------------------------------------------------
{
    it     : 'CASE: Id embryos update success',
    id     : 'ct111',
    send   : {'embryos': {'id': 'ct444'}},
    matched: {'embryos.id': 'CT444'}
  },
//-------------------------------------------------------------------------------
{
    it     : 'CASE: Id embryos update unsuccessful because id is required',
    id     : 'ct222',
    send   : {'embryos': {'id': ''}},
    matched: {'errors': 'Embryos validation failed: id: Path `id` is required.'}
  },
//-------------------------------------------------------------------------------
{
    it     : 'CASE: Id embryos update unsuccessful because id is unique',
    id     : 'ct222',
    send   : {'embryos': {'id': 'ct333'}},
    matched: {'errors': 'Embryos validation failed: id: Error, expected `id` to be unique. Value: `CT333`'}
  },
//-------------------------------------------------------------------------------
{
    it     : 'CASE: 1. Id embryos update unsuccessful because it does not contain spaces and charmaps',
    id     : 'ct222',
    send   : {'embryos': {'id': 'âct333'}},
    matched: {'errors': 'Embryos validation failed: id: Error, `id` cannot contain space and charmaps. Value: `ÂCT333`'}
  },
//-------------------------------------------------------------------------------
{
    it     : 'CASE: 2. Id embryos update unsuccessful because it does not contain spaces and charmaps',
    id     : 'ct222',
    send   : {'embryos': {'id': '_DT.111-'}},
    matched: {'errors': 'Embryos validation failed: id: Error, `id` cannot contain space and charmaps. Value: `_DT.111-`'}
  },
//-------------------------------------------------------------------------------
{
    it     : 'CASE: Sizes.name update success',
    id     : 'ct222',
    send   : { 'embryos': { 'sizes': [ {'name': ' s  '}, {'name': ' m  '}  ] } },
    matched: {'embryos.sizes[0].name': 'S', 'embryos.sizes[1].name': 'M'}
  },
//-------------------------------------------------------------------------------
{
    it     : 'CASE: Sizes.name update unsuccessful because Sizes.name is required',
    id     : 'ct222',
    send   : { 'embryos': { 'sizes': [ {'name': '  '}, {'name': ' m  '}  ] } },
    matched: {'errors': 'Embryos validation failed: sizes.0.name: Path `name` is required.'}
  },
//-------------------------------------------------------------------------------
{
    it     : 'CASE: Sizes.name update unsuccessful because Sizes.name is unique',
    id     : 'ct222',
    send   : { 'embryos': { 'sizes': [ {'name': 'm'}, {'name': 'm'}  ] } },
    matched: {'errors': 'Embryos validation failed: sizes: Error, expected `Sizes.name` to be unique. Value: `M`'}
  },
//-------------------------------------------------------------------------------
]

describe('PUT /api/embryos/:id -> Update a embryos', () => {
    // First, create some new embryos
    chai.request(uriTest)
        .post('/api/embryos')
        .send({
            'embryos': {
                'id': 'ct111'
            }
        })
        .end();

    chai.request(uriTest)
        .post('/api/embryos')
        .send({
            'embryos': {
                'id': 'ct222'
            }
        })
        .end();

    chai.request(uriTest)
        .post('/api/embryos')
        .send({
            'embryos': {
                'id': 'ct333'
            }
        })
        .end();

    for (let data of listData) {

        it(data.it, (done) => {
            chai.request(uriTest)
                .put('/api/embryos/' + data.id)
                .send(data.send)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.nested.include(data.matched);

                    done();

                });
        });

    }
});