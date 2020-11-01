var express = require("express");
var router = express.Router()
var db = require("../connection")


router.get('/', function(req, res, next) {
    
    var pk_id = req.query.pk_id

    var select_sql = " select C.*, M.user_id from comment C inner join member AS M on M.pk_id = C.member_id where C.admin_id = "+pk_id+""


    db.query(select_sql,function(err,data){
        if(err){
            console.log(err)
        }else{
            res.send(data);
        }
    })

});

module.exports = router;
