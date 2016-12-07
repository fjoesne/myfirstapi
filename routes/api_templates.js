const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('here will be templates');
});

module.exports = router;
