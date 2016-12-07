var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentModel = new Schema({
  title: {type: String},
  author: {type: String},
  category: {type: String},
  description: {type: String},
  read: {type: Boolean, default: false}
});

module.exports = mongoose.model('Document', documentModel);
