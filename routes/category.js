var express = require('express');
var router = express.Router();
var db = require("../connection")
    /* GET users listing. */
router.get('/', function(req, res, next) {


    var id = req.body.id
    var password = req.body.password
    var insert_sql = "insert into member(pk_id,user_id,password,type)values(null," + id + "," + password + ",2)"
    db.query(insert_sql, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            res.render("로그인 페이지 ")
        }
    })
    res.render("category")
});

module.exports = router;