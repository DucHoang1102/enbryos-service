var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    uriTest   = 'http://localhost:8080';

chai.use(chaiHttp);


/*
 * Test POST: /api/embryos
 */

var listData = [
  {
    it     : 'CASE: No id of embryos',
    send   : {},
    matched: {'errors': 'Embryos validation failed: id: Path `id` is required.'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: Id embryos is trim and upperCase',
    send   : {'embryos': {'id': '   ct1  '}},
    matched: {'embryos.id': 'CT1'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: Id embryos is unique',
    send   : {'embryos': {'id': 'ct1'}},
    matched: {'errors': 'Embryos validation failed: id: Error, expected `id` to be unique. Value: `CT1`'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: Sizes.name embryos is trim and upperCase',
    send   : {
                'embryos': {
                  'id': 'ct2',
                  'sizes': [
                      {'name': '   s  '}
                    ]
                }
            },
    matched: {'embryos.sizes[0].name': 'S'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: Sizes.name embryos is required 1',
    send   : {
                'embryos': {
                  'id': 'ct3',
                  'sizes': [
                      {'name': '    '},
                      {'name': 's'}
                    ]
                }
            },
    matched: {'errors': 'Embryos validation failed: sizes.0.name: Path `name` is required.'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: Sizes.name embryos is required 2',
    send   : {
                'embryos': {
                  'id': 'ct4',
                  'sizes': [
                      {'name': 's'},
                      {'name': ''}
                    ]
                }
            },
    matched: {'errors': 'Embryos validation failed: sizes.1.name: Path `name` is required.'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: Sizes.name embryos is unique',
    send   : {
                'embryos': {
                  'id': 'ct5',
                  'sizes': [
                      {'name': ' s   '},
                      {'name': '  s'}
                    ]
                }
            },
    matched: {'errors': 'Embryos validation failed: Sizes.name: Error, expected `Sizes.name` to be unique. Value: `S`'}
  }
]

describe('POST /api/embryos -> New a embryos', () => {
    for (let data of listData) {

        it(data.it, (done) => {
            chai.request(uriTest)
                .post('/api/embryos')
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