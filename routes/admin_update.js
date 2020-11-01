var express = require("express");
var router = express.Router();
var db = require("../connection");

router.get("/", function (req, res, next) {

  var sql_select = "select * from admin";

  db.query(sql_select, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/", function (req, res) {
  var data = req.body; //post일때는 바디

  var pk_id = data.pk_id;

  var content = data.content;

  var sql_update =
    "update admin set content ='" + content + "' where pk_id = '" + pk_id + "'";
  db.query(sql_update, function (err, data) {
    console.log("data", data);
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});
module.exports = router;