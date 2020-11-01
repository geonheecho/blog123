var express = require("express");
var router = express.Router();
var db = require("../connection");

router.post("/", function (req, res) {
  var pk_id = req.body.pk_id;//body post query get
  console.log("pk_id", pk_id);

  var del_sql = "delete from admin where pk_id= '" + pk_id + "'";
  console.log("del_sql", del_sql);

  db.query(del_sql, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});
module.exports = router;