var express = require('express');
var router = express.Router();
var db = require("../connection")



router.get('/', function(req, res, next) {
    

    var pk_id = req.query.pk_id

    var select_sql = "select A.*, M.type from admin A inner join member as M on M.pk_id = A.member_id where A.pk_id = " + pk_id + ""


    db.query(select_sql, function(err, data) {

        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })

});

module.exports = router;