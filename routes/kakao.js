var express = require('express');
var router = express.Router();
var db = require("../connection")

router.post('/', function(req, res) {
    
    //Front 에서 받아온 데이타
    var nickname = req.body.nickname
    var password = 1234
    
    //DB에 있는 아이디 체크 
    var S_sql = "select user_id,type from member where user_id = '"+nickname+"'"
    db.query(S_sql,function(err,data){
        if(err){
            console.log(err)
        }else{
            //데이터 있으면 바로 로그인으로 처리 
            if(data > 0){
                var data_nickname = data[0].user_id
                var type = data[0].type
                res.cookie("user_id", data_nickname);
                res.cookie("type", type);
                if(data_nickname = nickname){
                    res.send("로그인 처리 완료")
                }
            }else{
                //없으면 아이디를 체크 중복 체크 
                var data_nickname = nick_name
                var type = data[0].type
                res.cookie("user_id", data_nickname);
                res.cookie("type", type);

                //있으면 바로 front로 성공 메세지 처리 
                if(nickname == data_nickname){
                    res.send("로그인 중복")
                }else{

                    //DB에 ID없으면 등록 
                    var sql = "insert into member(pk_id,user_id,password,type)values(null,'"+nickname+"',"+password+",2)"

                        db.query(sql, function(err, data) {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        var getcookie_sql = "select * from member where user_id = '"+nickname+"'";
                                        db.query(getcookie_sql,function(err,data){
                                            if(err){
                                                console.log(data)
                                            }else{
                                                var type = data[0].type
                                                var user_id = data[0].user_id
                                                res.cookie("user_id", user_id);
                                                res.cookie("type", type);
                                                res.send(data)
                                            }
                                        })

                                }
                        })
                }
                



            }




        }
    })




});

module.exports = router;
