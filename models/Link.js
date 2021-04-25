var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  shortCode: String,
  shortUrl: String,
  original: String
});
LinkSchema.plugin(AutoIncrement, { inc_field: 'count', start_seq: 1 });

const Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
