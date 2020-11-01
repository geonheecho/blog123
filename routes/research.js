var express = require('express');
var router = express.Router();
var db = require("../connection")


router.post('/', function(req, res, next) {

    var data = req.body.title

    //select mysql 

    var S_mysql = "select * from admin where categories like '%" + data + "%';"

    db.query(S_mysql, function(err, data) {
        console.log("data", data)
        if (err) {
            console.log(err)
        } else {
            res.render("category",{data:data})

        }
    })


})

module.exports = router;