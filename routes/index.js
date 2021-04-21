var express = require('express');
var router = express.Router();
const Link = require('../models/Link');
var requestUrl = require('../helpers/requestUrl');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:shoreCode', function(req, res, next) {
  var { hash } = req.params;
  if (hash !== 'links') {
    Link.findOne({ shortCode: shortCode })
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
