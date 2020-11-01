const express = require('express');
const router = express.Router()
const db = require("../connection")
var pk_id = null

router.get("/", function(req, res) {

    pk_id = req.query.pk_id
        //update mysql 
    var S_heart = "select * from admin where pk_id = " + pk_id + ""
    db.query(S_heart, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            var like_number = data[0].like
            res.json(like_number);
        }
    })
})




module.exports = router;
