var express = require('express');
var router = express.Router();
var fund = require('./fund/fund');

router.use('/fund', fund);

module.exports = router;
