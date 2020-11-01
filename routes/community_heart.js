const express = require('express');
const router = express.Router()
const db = require("../connection")
var pk_id = null

router.get("/", function (req, res) {

    pk_id = req.query.pk_id
    //update mysql 
    var S_heart = "select * from board where pk_id = " + pk_id + ""
    db.query(S_heart, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            var like_number = data[0].like
            res.json(like_number);
        }
    })
})
router.post("/", function (req, res) {
    var like_number = req.body.like_number
    var admin_pk_id = pk_id
    var member_pk_id = req.body.member_pk_id
    console.log("member_pk_id", member_pk_id)
    //update sql 
    U_sql = "update board set `like` = `like` + " + like_number + " where pk_id = " + admin_pk_id + ""
    db.query(U_sql, function (err, data) {
        console.log("U_sql", U_sql)
        if (err) {
            console.log(err)
        } else {
            res.send("update")
        }
    })
})
module.exports = router;