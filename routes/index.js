var routerIndex = require('express').Router();
var routerGroup = require('express').Router();
var embryosController = require('../controllers/Embryos');

/*
 * Router for embryos
 */
routerGroup.get('/', embryosController.index);

routerGroup.get('/embryos', embryosController.view);

routerGroup.post('/embryos', embryosController.new);

routerGroup.get('/embryos/:id', embryosController.details);

routerGroup.put('/embryos/:id', embryosController.update);

routerGroup.delete('/embryos/:id', embryosController.delete);

/*
 * Router index
 */
routerIndex.use('/api', routerGroup);

module.exports = routerIndex;