var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    uriTest   = 'http://localhost:8080';

chai.use(chaiHttp);

/*
 * Test GET: /api
 */
describe('GET /api: Test index embryos', () => {
    it('Response a wecomel success', (done) => {
        chai.request(uriTest)
            .get('/api')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.deep.equal({
                    "status": "Embryos Service Api",
                    "message": "Welcome"
                });

                done();
            });
    });
});