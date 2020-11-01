var express = require("express");
var router = express.Router();
const passport = require('passport');

router.get("/", passport.authenticate('kakao', {
    successRedirect: '/',
    failureRedirect: "/login"
}));

module.exports = router;
