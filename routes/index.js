var express = require('express');
var router = express.Router();

const indexController = require('../controllers/index');

router.get('/', indexController.get);

router.get('/:code', indexController.redirectToOriginalURL);

module.exports = router;
