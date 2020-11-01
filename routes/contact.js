var express = require('express');
var router = express.Router();
var db = require("../connection")



router.get('/', function(req, res, next) {
    res.render("contact")
});

module.exports = router;