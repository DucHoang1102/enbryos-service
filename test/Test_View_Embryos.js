var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    dotenv    = require('dotenv').config({path: './.env'}),
    uriTest   = process.env.APP_URL + ':' + process.env.APP_PORT;

chai.use(chaiHttp);

/*
 * Test GET: /api/embryos
 */
// var listData = [
// ];

// describe('PUT /api/embryos/:id -> Update a embryos', () => {
//     // Seeding database
//     for (let i = 1; i < 22; i++) {
//         chai.request(uriTest)
//         .post('/api/embryos')
//         .send({
//             'embryos': {
//                 'id': 'CTAA' + i.toString(),
                
//             }
//         })
//         .end();
//     }
// });