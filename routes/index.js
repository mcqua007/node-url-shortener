var express = require('express');
var router = express.Router();
const Link = require('../models/Link');
var requestUrl = require('../helpers/requestUrl');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:hash', function(req, res, next) {
  var { hash } = req.params;
  if (hash !== 'links') {
    Link.findOne({ original: requestUrl(req) }).then(data => {
      res.redirect(301, data.redirectUrl);
      next();
    });
  } else {
    next();
  }
});

module.exports = router;
