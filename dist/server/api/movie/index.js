'use strict';

var express = require('express');
var controller = require('./movie.controller');

var router = express.Router();

router.get('/withImages', controller.withImages);
router.get('/getStats', controller.getStats);
router.post('/saveUserExperiment', controller.saveUserExperiment);

module.exports = router;
