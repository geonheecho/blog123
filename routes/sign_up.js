var express = require("express");
var router = express.Router();
var db = require("../connection");


/* GET home page. */

router.post("/", function (req, res) {


    var user_id = req.body.user_id;
    var password = req.body.password;
    var pwconfm = req.body.passwdconfm;


    var sql = "SELECT * FROM member where user_id = '" + user_id + "'";

    db.query(sql, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            //DB의 값
            var data = data
            if (data <= 0) {
                sql2 = "insert into member(pk_id,user_id,password,type)values(null,'" + user_id + "','" + password + "',2)"
                db.query(sql2, function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.render("login")
                    }
                })
            } else {
                res.send('<script type="text/javascript">alert("존재하는 사용자입니다."); history.back(-2);</script>')
                res.end()
            }

        }
    });
});
module.exports = router;