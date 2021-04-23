var express = require('express');
var router = express.Router();
const Link = require('../models/Link');
const validUrl = require('valid-url');
const { urlAlphabet, customAlphabet, nanoid } = require('nanoid');

//get links
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
//create a new link
router.post('/', async function(req, res, next) {
  var { original } = req.body;
  if (!original) {
    res.status(400).json({
      success: false,
      message: 'error',
      error: 'original cannot be empty'
    });
    next();
  } else if (!validUrl.isUri(original)) {
    res.status(400).json({
      success: false,
      message: 'error',
      error: 'Not a valid url'
    });
    next();
  } else {
    Link.findOne({ original: original })
      .then(data => {
        if (!data) {
          const nanoid = customAlphabet(urlAlphabet, 8); //create shorter nanoId - still 23 trillion combinations
          var shortCode = nanoid();
          var shortUrl = `http://localhost:3200/` + shortCode;
          Link.exists({ shortCode: shortCode }, function(doc) {
            if (!doc) {
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
              res.status(500).json({
                success: false,
                message: 'error',
                error: 'A collision occured with short code. Please re-submit.'
              });
            }
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
  }
});

module.exports = router;
