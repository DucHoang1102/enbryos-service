var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    uriTest   = 'http://localhost:8080';

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