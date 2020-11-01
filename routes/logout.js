const express = require("express");
const router = express.Router("express");
const db = require("../connection");


router.get("/",function(req,res){
    

    res.clearCookie("type");
    res.clearCookie("user_id");
    res.clearCookie("member_pk_id");
    res.render("index")
})

module.exports = router;