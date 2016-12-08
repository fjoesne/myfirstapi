var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/docdb';
//database setup.
var db;
if (process.env.ENV){
  // use DB reflecting the environment. (test, dev, staging etc)
  db = mongoose.connect(dbUrl+'_'+process.env.ENV);
} else {
  // use default database environment
  db = mongoose.connect(dbUrl);
}

var Document = require('../models/document');

router.get('/', function(req, res){
  res.status(400).send('Empty. Consult the API-documentation.');
});

router.use('/documents', require('./api_documents')(Document));

module.exports = router;
