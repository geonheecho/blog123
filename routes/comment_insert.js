var express = require('express');
const { commands } = require('npm');
var router = express.Router();
var db = require("../connection")


router.post('/', function(req, res, next) {

        var data = req.body
        var admin_id = data.pk_id
        var subject = data.subject
        var message = data.message
        var member_id = req.cookies.member_pk_id
        var present_time = new Date()*1000

        // insert comment 테이블
        var sql = "insert into comment(pk_id,admin_id,member_id,comment,likes,insert_time,title)values(null,"+admin_id+","+member_id+",'"+message+"',0,'"+present_time+"','"+subject+"')"
            db.query(sql, function(err, data) {
                if (err) {
                    console.log(err)
                } else {
                    res.send(data)
                }
            })

});

module.exports = router;