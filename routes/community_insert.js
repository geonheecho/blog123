var express = require('express');
var router = express.Router();
var db = require("../connection")
const multer = require("multer");
const path = require('path')


router.get("/", function (req, res, next) {

    var sql_select = "select * from board";
    console.log("sql: " + sql_select);



    db.query(sql_select, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

// 이미지를 저장 하는 변수 
let storage = multer.diskStorage({
    //이미지를 저장할 장소를 저장하는 함수 
    destination: function (req, file, callback) {
        callback(null, "./public/img/upload_img")
    },

    //파일 이름
    filename: function (req, file, callback) {

        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + extension);
    }
});


var upload = multer({
    storage: storage
})


router.post('/', upload.single("img"), function (req, res, next) {
    console.log("req", req.body)
    //var data = req.body;//post일때는 바디
    //쿠기 가져오기 
    var member_id = req.cookies.member_pk_id
    console.log("member_id", member_id)
    var title = req.body.title
    var editor1 = req.body.editor1
    // var img = req.file.originalname
    var present_time = new Date() * 1000
    var categories = req.body.categories
    var sql = "insert into board(pk_id,title,date,content,`like`,member_id,comment_id,categories)values(null,'" + title + "','" + present_time + "','" + editor1 + "',0," + member_id + ",0,'" + categories + "')"

    console.log("sql", sql)
    db.query(sql, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            // res.send(data)
            //res.send("community", { data: data });
            res.render("community");

        }
    })


});

module.exports = router;
