var express = require('express');
var router = express.Router();
var db = require("../connection")


router.post('/', function (req, res, next) {

    var data = req.body
    var pk_id = data.board_pk_id
    console.log("pk_id", pk_id)

    var categories = data.categories
    var content = data.editor1
    var title = data.title


    var sql_update = "update board set title ='" + title + "' ,content ='" + content + "' where pk_id = " + pk_id + "";
    console.log("sql_update", sql_update)
    db.query(sql_update, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.render("community_details")
            //]res.send(data);

        }
    })
})

module.exports = router;