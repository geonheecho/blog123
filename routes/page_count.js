var express = require('express');
var router = express.Router();
var db = require("../connection")


router.get('/', function(req,res,next){


    var sql = "select count(*) as cnt from admin"

    db.query(sql,function(err,data){
        if(err){
            console.log(err)
        }else{
            var cnt = data[0].cnt
            res.json(cnt)
        }
    })
})

module.exports = router;