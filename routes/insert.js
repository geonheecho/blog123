var express = require('express');
var router = express.Router();
var db = require("../connection")
const multer = require("multer");
const path = require('path')


// 이미지를 저장 하는 변수 
let storage = multer.diskStorage({
    //이미지를 저장할 장소를 저장하는 함수 
    destination: function(req, file ,callback){
        callback(null, "./public/img/upload_img")
    },

    //파일 이름
    filename: function(req, file, callback){
        
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + extension);
    }
});


var upload = multer({
    storage: storage
})


router.post('/', upload.single("img"), function(req, res, next) {

    //쿠기 가져오기 
    var member_id = req.cookies.member_pk_id


    var title = req.body.title
    var categories = req.body.categories
    var img = req.file.originalname
    var present_time = new Date()*1000
    var editor1 = req.body.editor1
    var sql = "insert into admin(pk_id,title,date,content,img,`like`,visit,member_id,comment_id,categories)values(null,'"+title+"','"+present_time+"','"+editor1+"','"+img+"',0,0,"+member_id+",0,'"+categories+"')"


    db.query(sql,function(err,data){
        if(err){
            console.log(err)
        }else{
            // res.send(data)
            res.render("index")
        }
    })


});

module.exports = router;
