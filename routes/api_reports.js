const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('here there will be reports');
});

module.exports = router;
