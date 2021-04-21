var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Link = mongoose.model(
  'Link',
  new Schema({
    shortCode: String,
    shortUrl: String,
    original: String
  })
);

module.exports = Link;
