var express = require('express');
var router = express.Router();
var db = require("../connection")

router.get('/', function(req, res, next) {
    var data = req.query
    var s_point = data.s_point;
    var list = data.list;
    //id를 찾아보 본다. 

    //front data를 받은 값


    var select_sql = "select * from admin order by pk_id desc LIMIT " + s_point + "," + list + ""; 


    db.query(select_sql,function(err,data){

        if(err){
            console.log(err)
        }else{
                //for문으로 모든 데이터 다 보내기 
                var data = data
                res.send(data)

        }
    })

});

module.exports = router;
