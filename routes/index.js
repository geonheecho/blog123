var express = require('express');
var router = express.Router();
var db = require("../connection")



router.get('/', function(req, res, next) {

    
    var sql = "select * from admin"

    db.query(sql,function(err,data){

        if(err){
            console.log(err)
        }else{
            res.render("index",{data:data})
        }
        })

});

module.exports = router;
