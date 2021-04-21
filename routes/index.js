var express = require('express');
var router = express.Router();
const Link = require('../models/Link');
var requestUrl = require('../helpers/requestUrl');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:code', function(req, res, next) {
  var { code } = req.params;
  if (code !== 'links') {
    Link.findOne({ shortCode: code })
      .then(data => {
        res.redirect(301, data.original);
        next();
      })
      .catch(e => {
        res.status(500).json({
          success: false,
          message: 'error',
          error: e
        });
      });
  } else {
    next();
  }
});

module.exports = router;
