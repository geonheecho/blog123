var express = require("express");
var router = express.Router();
var db = require("../connection");

router.get("/", function (req, res, next) {
  var sql1 = "select * from admin";
  //console.log(sql1);
  db.query(sql1, function (error, data) {
    if (error) {
      console.log("db오류: " + error);
    } else {
      console.log(data);
      //res.json(data);
      res.render("admin", { data: data });
      //res.send(data);
    }
  });
});
module.exports = router;
