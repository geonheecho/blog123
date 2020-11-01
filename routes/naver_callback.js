var express = require("express");
var router = express.Router();
const passport = require('passport');

router.get("/", passport.authenticate('naver', {
    successRedirect: '/',
    failureRedirect: "/login"
}));

module.exports = router;
