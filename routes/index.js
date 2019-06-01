var routerIndex = require('express').Router();
var routerGroup = require('express').Router();
var embryosController = require('../controllers/Embryos');
var sizesController = require('../controllers/Sizes');

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
 * Router for sizes of embryos
 */
routerGroup.get('/embryos/:id/sizes', sizesController.view);

routerGroup.post('/embryos/:id/sizes', sizesController.new);

routerGroup.get('/embryos/:id/sizes/:name', sizesController.details);

routerGroup.put('/embryos/:id/sizes/:name', sizesController.update);

routerGroup.delete('/embryos/:id/sizes/:name', sizesController.delete);

/*
 * Router index
 */
routerIndex.use('/api', routerGroup);

module.exports = routerIndex;