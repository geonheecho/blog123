'use strict';

// var type = Cookies.get("type")
var express = require("express");
var router = express.Router();

router.get("/",function(req,res){
    var type = req.user.type 
    console.log("dasdsadasdasdas", type)
    

var num = 0; // 페이징 처리위한 총 데이터수
var page = 1; // 현재 페이지
var list = 3; // 한페이지 보여줄 데이터수
var block = 3; // 페이지 블럭수
var pageNum = 0; // 총 페이지수
var blockNum = 0; // 총 블럭수
var nowBlock = 0; // 미정
var s_page = 0; // 시작 페이지
var e_page = 0; // 마지막 페이지
var s_point = 0; // 데이터 검색시 시작수

header()

function header() {
    var html = ""
    if (type == "" || type == undefined || type == '') {
        html += '<li class="menu-active"><a href="/">Home</a></li>'
        html += '<li><a href="login">login</a></li>'
        $('#header_list').html(html)
    } else if (type == 2) {
        html += '<li class="menu-active"><a href="/">Home</a></li>'
        html += '<li><a href="logout">로그아웃</a></li>'
        html += '<li><a href="community">커뮤니티게시판</a></li>'
        $('#header_list').html(html)
    } else if (type == 1) {
        html += '<li class="menu-active"><a href="/">Home</a></li>'
        html += '<li><a href="logout">로그아웃</a></li>'
        html += '<li><a href="admin">admin</a></li>'
        html += '<li><a href="contact">write</a></li>'
        html += '<li><a href="community">커뮤니티게시판</a></li>'
        $('#header_list').html(html)
    }
}


page_button(1)

function page_button(page_r) {

    $.ajax({

        url: '/page_count',
        dataType: 'json',
        type: 'get',
        data: data,

        success: function (data) {
            var html = '';
            var count = data;
            num = count;
            page = page_r;
            pageNum = Math.ceil(num / list);
            blockNum = Math.ceil(pageNum / block);
            nowBlock = Math.ceil(page / block);
            s_page = (nowBlock * block) - 2;
            e_page = nowBlock * block;
            if (s_page <= 1) {
                s_page = 1;
            }
            if (pageNum <= e_page) {
                e_page = pageNum;
            }
            s_point = (page - 1) * list;
            var html_page = '';
            var qian = s_page - 1;
            var hou = e_page + 1;
            if (qian < 1) {
                qian = 1;
            }
            if (hou <= e_page) {
                hou = pageNum;
            }
            if (s_page > e_page) { } else if (num == 0) { } else {
                html_page += '<button type="button" onclick=page_button(' + qian + ') class="btn btn-primary" style="' +
                    'background-color: #8050fa;">이전</' +
                    'button>';
                for (var i = s_page; i <= e_page; i++) {
                    if (page == i) {
                        html_page += '<button type="button" onclick=page_button(' + i + ') class="btn btn-primary" style="' +
                            'background-color: #8050fa;">' + i + '</button>';
                    } else {
                        html_page += '<button type="button" onclick=page_button(' + i + ') class="btn btn-primary" style="' +
                            'background-color: #8050fa;">' + i +
                            '</button>';
                    }
                }
                html_page += '<button type="button" onclick=page_button(' + hou + ',5555) class="btn btn-primary" style="' +
                    'background-color: #8050fa;">' +
                    '다음</button>';
            }
            $("#pagination-wrapper").html(html_page);
        }

    })



    var data = {
        s_point: s_point,
        list: list
    }

    $.ajax({
        url: '/detail',
        dataType: 'json',
        type: 'get',
        data: data,

        success: function (data) {
            //DB에서 받아온 모든 데이터를 활용해서 for문을 돌려서 list를 뿌리기
            var data = data
            var html = ''
            for (var i = 0; i < data.length; i++) {
                var pk_id = data[i].pk_id
                var title = data[i].title
                var img = data[i].img
                var insert_time = data[i].date
                var like = data[i].like
                var date = new Date(insert_time / 1000);
                var start_time = date
                    .getFullYear()
                    .toString() + "-" + (
                        date.getMonth() + 1
                    )
                        .toString() + "-" + date
                            .getDate()
                            .toString() + "-" + date
                                .getHours() + ":" + date
                                    .getMinutes()
                var category = data[i].categories.length
                html += ' <section class="post-area">'
                html += '<div class="single-post-item">'
                html += '<div class="single-post-item">'
                html += '<figure>'
                html += '<img class="img-fluid" src="img/upload_img/' + img + '">'
                html += '</figure>'
                html += '<h3> ' + title + ''
                html += '<article> ' + start_time + '<span style="padding:20px;"><img src="img/heart_img.png" style="width:30px;">' + like + '</span></article>'
                html += '</h3>'
                html += '<button class="primary-btn text-uppercase mt-15" onclick="link_to_detail(' + pk_id + ')">continue Reading</button>'
                html += '</div>'
                html += '</section>'
                $('#section_id').html(html)
            }



        },
        error: function (data) {
            console.log(data)
        }
    })

}

//다음 페이지로 이동 시켜줄때 PK_id를 받아와서 해당 데이터의 데이터만 보여주기 
function link_to_detail(pk_id) {
    var pk_id = pk_id

    localStorage.setItem("#pk_id", pk_id);
    location.href = "blog"
}


function search() {



    var title = $("#S_title").val()



    var data = {
        title: title
    }


    $.ajax({

        url: '/search',
        dataType: 'json',
        type: 'post',
        data: data,

        success: function (data) {
            console.log(data);
        }

    })


}

top_list()
function top_list() {



    $.ajax({
        url: "/top_list",
        dataType: "json",
        type: "get",


        success: function (data) {

            var html = ""
            for (var i = 0; i < data.length; i++) {
                var title = data[i].title

                var img = data[i].img
                var insert_time = data[i].date

                var content = data[i].content
                var insert_time = data[i].date

                var date = new Date(insert_time / 1000);
                var start_time = date
                    .getFullYear()
                    .toString() + "-" + (
                        date.getMonth() + 1
                    )
                        .toString() + "-" + date
                            .getDate()
                            .toString() + "-" + date
                                .getHours() + ":" + date
                                    .getMinutes()

                html += '<div class="single-popular-post d-flex flex-row">'
                html += '<div class="popular-thumb">'
                html += '<img class="img-fluid" src="img/upload_img/' + img + '" style="height:120px;">'
                html += '<div class="popular-details">'
                html += '<br>'
                html += '<a href="blog-details.html">'
                html += '<h4>' + title + '</h5>'
                html += '</a>'
                html += '<p class="text-uppercase">' + start_time + '</p>'
                html += '</div>'
                html += '</div>'
                html += '</div>'
                html += '   <br>'
                html += '   <br>'
                $("#blog_list").html(html)
            }
        }

    })

}


})

