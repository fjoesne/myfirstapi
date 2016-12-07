var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connect(process.env.MONGO_DB);

var Document = require('../models/document');

router.get('/', function(req, res){
  res.status(400).send('Empty. Consult the API-documentation.');
});

router.use('/documents', require('./api_documents')(Document));
router.use('/reports', require('./api_reports'));
router.use('/templates', require('./api_templates'));

module.exports = router;
