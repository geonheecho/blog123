'use strict';
//index.page 받아요 pk_id
var pk_id = localStorage.getItem("#pk_id", pk_id);
var type = Cookies.get("type")




header()

function header() {
    var html = ""
    if (type == "" || type == undefined || type == '') {
        html += '<li class="menu-active"><a href="/">Home</a></li>'
        html += '<li><a href="login">login</a></li>'
        $('#header_list').html(html)
    } else if (type == 1 || type == 2) {
        html += '<li class="menu-active"><a href="/">Home</a></li>'
        html += '<li><a href="logout">로그아웃</a></li>'
        $('#header_list').html(html)
    }
}

title()
comment()

function title() {

    var data = {
        pk_id: pk_id
    }

    $.ajax({
        url: "/content",
        dataType: 'json',
        type: 'get',
        data: data,
        success: function (data) {
            var title = data[0].title
            var html = ''
            var pk_id = data[0].pk_id
            // var type = data[0].type
            var img = data[0].img
            var content = data[0].content
            var insert_time = data[0].date
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

            if (type == 1) {
                html += '<div class="single" rows="5" style="border-style:solid; padding: 30px; height: 150px;"><h1>' + title + '</h1>'
                html += '<br>'
                html += ' <h5> ' + start_time + '</h5>'
                html += '<button class="float-right" onclick=edit(' + pk_id + ') >수정하기</button>'

                html += '</div>'
                html += '<img class="img-fluid" alt="">'
                html += '<div class="user_details">'
                html += '<div class="float-left">'

                html += '</div>'

                // html += '<div class="float-right">'
                html += '<div class="media">'
                html += '<div class="media-body">'

                html += '</div>'

                html += '<div class="d-flex">'

                html += '</div>'
                html += '</div>'

                html += '</div>'

                html += '</div>'
                html += ' ' + content + ' '

                $("#content_data").html(html)
            } else {
                html += '<div class="single" rows="5" style="border-style:solid; padding: 30px; height: 150px;"><h1>' + title + '</h1>'
                html += '<br>'
                html += ' <h5> ' + start_time + '</h5>'
                html += '</div>'
                html += '<div class="user_details">'
                html += '<div class="float-right">'
                html += '<div class="media">'
                html += '<div class="media-body">'
                html += '</div>'
                html += '<div class="d-flex">'
                html += '</div>'
                html += '</div>'
                html += '</div>'
                html += '</div>'
                html += ' ' + content + ' '

                $("#content_data").html(html)
            }

        },
        error: function (error) {
            console.log(error)
        }
    })
}


//form_list 데이터 처리 
function form_list() {


    var C_pk_id = Cookies.get("pk_id");


    if (C_pk_id == "" || C_pk_id == undefined || C_pk_id == null) {
        alert("로그인을 해주세요");
    }


    var subject = $("#subject").val()
    var message = $("#message").val()

    var data = {
        subject: subject,
        message: message,
        pk_id: pk_id
    }


    $.ajax({
        url: "/comment_insert",
        dataType: "json",
        type: "post",
        data: data,

        success: function (data) {
            history.go(-0);

        }
    })

}


//comment불러오기 
function comment() {


    var html = ""
    var data = {
        pk_id: pk_id
    }
    $.ajax({
        url: "comment",
        dataType: "json",
        type: "get",
        data: data,
        success: function (data) {

            var data = data

            for (var i = 0; i < data.length; i++) {
                var user_id = data[i].user_id
                var comment = data[i].comment
                var insert_time = data[i].insert_time
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

                html += '<br>'
                html += '<div class="thumb">'
                html += '</div>'
                html += '<div class="desc" style="border-style:outset;">'
                html += '<h5><a href="#">' + user_id + '</a></h5>'
                html += '<p class=>' + start_time + '</p>'
                html += '<p class="comment"> ' + comment + ' </p>'
                html += '</div>'
                html += '</div>'
                html += '<div class="reply-btn">'
                // html += '<a href="" class="btn-reply text-uppercase">reply</a>'
                html += '</div>'
                html += '  </div>'
                $("#comment_list").html(html)
            }
        }

    })
}

//edit 수정하는 function

function edit(pk_id) {

    localStorage.setItem("#member_pk_id", pk_id);
    location.href = "blog_edit_db"
}

//하트 function 처리 

$(document).ready(function () {

    var data = {
        pk_id: pk_id
    }

    $.ajax({
        url: "/heart",
        dataType: "text",
        type: "get",
        data: data,

        success: function (data) {
            var data = data
            var html = ''

            html += ' ' + data + ''

            $("#number_like").html(html)
        }
    })


    $('.content').click(function () {

        var member_pk_id = Cookies.get("member_pk_id")

        if (member_pk_id == undefined) {
            alert("로그인을 해주세요");
        } else {
            $('.content').toggleClass("heart-active")
            $('.text').toggleClass("heart-active")
            $('.numb').toggleClass("heart-active")
            $('.heart').toggleClass("heart-active")

            var data_set = {
                member_pk_id: member_pk_id,
                pk_id: pk_id

            }
            console.log("data_set", data_set)
            $.ajax({
                url: "/addheart",
                dataType: "text",
                type: "get",
                data: data_set,
                success: function (data) {
                    console.log(data)
                }
            })
        }

    });



});

