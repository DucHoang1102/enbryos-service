var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    uriTest   = 'http://localhost:8080';

chai.use(chaiHttp);

/*
 * Test GET: /api/embryos/:id
 */
var listData = [
  {
    it     : 'CASE: Embryos not found',
    id     : 'cdfsdfdedfd11',
    send   : {},
    matched: {'errors': 'Embryos not found'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: Details a embryos',
    id     : 'ct12333',
    send   : {},
    matched: {
        'embryos.id'         : 'CT12333',
        'embryos.name'       : 'Áo cộc tay trắng',
        'embryos.description': '',

        'embryos.sizes[0].name'       : 'S',
        'embryos.sizes[0].buy_price'  : 30000,
        'embryos.sizes[0].amount'     : 150,
        'embryos.sizes[0].description': 'This is size S',

        'embryos.sizes[0].dim.height_min': 10,
        'embryos.sizes[0].dim.height_max': 20,
        'embryos.sizes[0].dim.weight_min': 30,
        'embryos.sizes[0].dim.weight_max': 40,

        'embryos.sizes[1].name': 'M',
    }
  },
];

describe('GET /api/embryos/:id -> Details a embryos', () => {
    // First, create a new embryos
    chai.request(uriTest)
        .post('/api/embryos')
        .send({
            'embryos': {
                'id': 'ct12333',
                'name': 'Áo cộc tay trắng',
                'sizes': [
                    {
                        'name': 's',
                        'description': 'This is size S',
                        'amount': 150,
                        'buy_price': 30000,
                        'dim': {
                            "height_min": 10,
                            "height_max": 20,
                            "weight_min": 30,
                            "weight_max": 40
                        }
                    },
                    {'name': 'm'}
                ]
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