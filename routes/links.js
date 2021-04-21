var express = require('express');
var router = express.Router();
const Link = require('../models/Link');
const { customRandom, urlAlphabet, customAlphabet, nanoid } = require('nanoid');

router.get('/', function(req, res, next) {
  Link.find()
    .then(data => {
      res.status(200).json({
        success: true,
        message: 'OK',
        data: data
      });
    })
    .catch(e => {
      res.status(500).json({
        success: false,
        message: 'error',
        error: e
      });
    });
});

router.post('/', function(req, res, next) {
  var { original } = req.body;
  var shortCode = nanoid();
  var shortUrl = `http://localhost:3200/` + shortCode;
  Link.findOne({ original: original })
    .then(data => {
      if (!data) {
        Link.create({ original: original, shortUrl: shortUrl, shortCode: shortCode })
          .then(data => {
            res.status(200).json({
              success: true,
              message: 'OK',
              data: data
            });
          })
          .catch(e => {
            res.status(500).json({
              success: false,
              message: 'error',
              error: e
            });
          });
      } else {
        res.status(200).json({
          success: true,
          message: 'OK',
          data: data
        });
      }
    })
    .catch(e => {
      res.status(500).json({
        success: false,
        message: 'error',
        error: e
      });
    });
});

module.exports = router;
