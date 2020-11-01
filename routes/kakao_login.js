var express = require("express");
var router = express.Router();
const passport = require('passport');

router.get("/", passport.authenticate('kakao'));

module.exports = router;
