var express = require("express");
var routre = express.Router();
var db = require("../connection");
const router = require("./community_content");

router.post("/", function (req, res) {

    var pk_id = req.body.pk_id;
    console.log("pk_id123", pk_id)
    var del_sql = "delete from board where pk_id= '" + pk_id + "'";
    console.log("del_sql", del_sql)

    db.query(del_sql, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});
module.exports = router;
