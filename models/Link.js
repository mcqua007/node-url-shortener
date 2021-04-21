var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Link = mongoose.model(
  'Link',
  new Schema({
    original: String,
    to: String
  })
);

module.exports = Link;
