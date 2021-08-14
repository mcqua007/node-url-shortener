const Link = require('../models/Link');
const validUrl = require('valid-url');

function findAll(req, res, next) {
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
}

async function create(req, res, next) {
  var { original } = req.body;
  if (!original) {
    res.status(400).json({
      success: false,
      message: 'error',
      error: 'Original url cannot be empty!'
    });
  } else if (!validUrl.isUri(original)) {
    res.status(400).json({
      success: false,
      message: 'error',
      error: 'Not a valid url'
    });
  } else {
    try {
      var originalExists = await Link.findOne({ original: original });
      if (!originalExists) {
        var data = await Link.create({ original: original });
        let shortCode = data.count.toString(36); //use base36
        let shortUrl = `http://localhost:3200/` + shortCode;
        var updateData = await Link.findOneAndUpdate(
          { _id: data.id },
          { shortUrl: shortUrl, shortCode: shortCode },
          { new: true }
        );
      }

      res.status(200).json({
        success: true,
        message: 'OK',
        data: originalExists ? originalExists : updateData
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: 'error',
        error: e
      });
    }
  }
}
module.exports = {
  findAll,
  create
};
