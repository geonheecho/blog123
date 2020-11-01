var express = require("express");
var router = express.Router();
var db = require("../connection");

router.get("/", function (req, res, next) {
    var sql_select = "select * from board";
    console.log(sql_select + "들어와써요?");
    db.query(sql_select, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render("community", { data: data });
            //res.send(data);
        }
    });
});
module.exports = router;
