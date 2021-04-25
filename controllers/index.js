const Link = require('../models/Link');
var requestUrl = require('../helpers/requestUrl');

//render index page
function get(req, res, next) {
  res.render('index', { title: 'URL Shortener' });
}

//redirect to original URL
function redirectToOriginalURL(req, res, next) {
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
}
module.exports = {
  get,
  redirectToOriginalURL
};
