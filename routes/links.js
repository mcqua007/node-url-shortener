var express = require('express');
var router = express.Router();
const Link = require('../models/Link');

router.get('/', function(req, res, next) {
  Link.find().then(data => {
    res.status(200).json({
      success: true,
      message: 'OK',
      data: data
    });
  });
});

module.exports = router;
