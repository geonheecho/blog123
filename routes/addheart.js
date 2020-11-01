
var express = require("express");
var router = express.Router()
var db = require("../connection")


router.get("/", function(req,res){


    var data = req.query;
    var member_pk_id = data.member_pk_id
    var pk_id = data.pk_id
    console.log("pk_id", pk_id)
    //sql select pk_id로 업데이트 됬으면 업데이트 금지 
    var S_sql = "select `like` from admin where member_id = "+member_pk_id+" "

    db.query(S_sql, function(err,data){
        if(err){

        }else{
                
            var likes = data[0].like
            if(likes == 0){
                //update sql 
                U_sql = "update admin set `like` = `like` + 1 where member_id = "+member_pk_id+""
                db.query(U_sql,function(err,data){
                console.log("U_sql", U_sql)
                    if(err){
                        console.log(err)
                    }else{
                        res.send("update")
                    }
                })
            }else{
                //update sql 
                D_sql = "update admin set `like` = 0 where member_id = "+member_pk_id+"";
                db.query(D_sql,function(err,data){
                    if(err){
                        console.log(data)
                    }else{
                        res.send("update")
                    }
                })
            }
        }
    })

    
})


module.exports = router;