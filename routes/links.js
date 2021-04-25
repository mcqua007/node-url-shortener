var express = require('express');
var router = express.Router();

const linkController = require('../controllers/link');

//get links
router.get('/', linkController.findAll);
//create a new link
router.post('/', linkController.create);

module.exports = router;
