var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    uriTest   = 'http://localhost:8080';

chai.use(chaiHttp);

/*
 * Test DELETE: /api/embryos/:id
 */
var listData = [
  {
    it     : 'CASE: Embryos not found',
    id     : 'cdfs1',
    send   : {},
    matched: {'errors': 'Embryos not found'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: Embryos delected successfully',
    id     : 'ct44555',
    send   : {},
    matched: {'embryos.id': 'CT44555'}
  },
//-------------------------------------------------------------------------------
];

describe('DELETE /api/embryos/:id -> Delete a embryos', () => {
    // First, create a new embryos
    chai.request(uriTest)
        .post('/api/embryos')
        .send({
            'embryos': {
                'id': 'ct44555'
            }
        })
        .end();

    for (let data of listData) {

        it(data.it, (done) => {
            chai.request(uriTest)
                .get('/api/embryos/' + data.id)
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