var express = require('express');
var router = express.Router();
var db = require("../connection")


router.post('/', function(req,res,next){

    var data = req.body
    var pk_id = data.admin_pk_id

    var categories = data.categories
    var content = data.content_box


    var sql_update = "update admin set content ='"+content+"' where pk_id = "+pk_id+" "

    db.query(sql_update,function(err,data){
        if(err){
            console.log(err)
        }else {
            res.render("blog-details")
        }
    })
})

module.exports = router;