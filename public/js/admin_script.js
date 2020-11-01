'use strict';

var type = Cookies.get("type")

header()

function header() {
    var html = ""
    if (type == "" || type == undefined || type == '') {
        html += '<li class="menu-active"><a href="/">Home</a></li>'
        html += '<li><a href="login">login</a></li>'
        $('#header_list').html(html)
    } else if (type == 2) {
        html += '<li class="menu-active"><a href="/">Home</a></li>'
        html += '<li><a href="community">커뮤니티게시판</a></li>'
        html += '<li><a href="logout">로그아웃</a></li>'
        $('#header_list').html(html)
    } else if (type == 1) {
        html += '<li class="menu-active"><a href="/">Home</a></li>'
        html += '<li><a href="community">커뮤니티게시판</a></li>'
        html += '<li><a href="logout">로그아웃</a></li>'
        html += '<li><a href="admin">admin</a></li>'
        html += '<li><a href="contact">write</a></li>'
        $('#header_list').html(html)
    }
}

var data_list = null;

start()

function start() {

    $.ajax({
        url: "/admin_update",
        dataType: "json",
        type: "get",

        success: function (data) {
            data_list = data
            var html = ''
            for (var i = 0; i < data.length; i++) {
                var pk_id = data[i].pk_id
                var title = data[i].title
                var content = data[i].content
                html += '<tr>'
                html += '<td id="pk_id" name="pk_id">' + pk_id + '</td>'
                html += '<td id="title" name="title">' + title + '</td>'
                html += '<td id="content" name="content" style="width:100px;">' + content + '</td>'
                html += '<td><button class="btn btn-primary" data-toggle="modal" data-target="#edit_information" onclick="updata_sql2(' + i + ');">수정</button></td>'
                html += '<td><button class="btn btn-primary" data-toggle="modal" data-target="#del_information" onclick="delete_sql(' + i + ');">삭제</button></td>'
                html += '</tr>'

                $("#table_list").html(html);
            }
        },

        error: function (data) {
            console.log(data);
        },
    });
}


function updata_sql2(i) {

    var pk_id = data_list[i].pk_id
    var content = data_list[i].content
    var title = data_list[i].title


    var data = {
        pk_id: pk_id,
        content: content,
        title: title,
    }


    $.ajax({
        url: "/admin_update",
        type: "get",
        dataType: "json",
        data: data,
        success: function (data) {
            var html = '';
            html += '<div class="modal-dialog modal-dialog-centered" role="document">';
            html += '   <div class="modal-content">';
            html += '       <div class="modal-card card" data-toggle="lists">';
            html += '           <div class="card-header">';
            html += '               <div class="row align-items-center">';
            html += '                   <div class="col"><h4 class="card-header-title" id="exampleM' +
                'odalCenterTitle">정보 수정</h4></div>';
            html += '                   <div class="col-auto"><button type="button" class="close" a' +
                'ta-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></butto' +
                'n></div>';
            html += '               </div>';
            html += '           </div>';
            html += '           <div class="card-body" style="max-height: 850px;">';
            html += '               <div class="form-row">';
            html += '                       <div style="font-size: 12px;color: #899db7;margin: 0;">' +
                'Img 선택</div>';
            html += '<input class="form-control" id="data_pk_id" name="pk_id" value=' + pk_id + ' hidden>'
            html += '<textarea name="content" id="content_data"  value="content_data" style="width: 480px; height: 400px;">"' + content + '"</textarea>'
            // html += '          <input type="text" class="form-control" id="content_data" style="width: 480px; height: 400px;" value='+content+' >';
            html += '<br>'
            html += '<br>'
            html += '<br>'
            html += '<button type="submit" class="btn btn-primary" onclick="link_to_detail();" >보내기</button>'
            html += '           </div>';
            html += '       </div>';
            html += '   </div>';
            html += '</div>';

            $('#edit_information').html(html);
            //console.log("들어오나요?"+title)

        }
    })
}

//다음 페이지로 이동 시켜줄때 PK_id를 받아와서 해당 데이터의 데이터만 보여주기 
function link_to_detail() {


    var content = $("#content_data").val();
    var pk_id = $("#data_pk_id").val();

    var data = {
        pk_id: pk_id,
        content: content,
    }
    // console.log("functionlink_to_detail -> data", data)


    $.ajax({
        url: "/admin_update",
        type: "post",
        dataType: "json",
        data: data,
        success: function (data) {

            alert("수정되었습니다.")
            history.go(0);
            // $('#edit_information').modal("hide");


        }
    })
}

function delete_sql(i) {
    var pk_id = data_list[i].pk_id

    var data = {
        pk_id: pk_id,
    }
    $.ajax({
        url: "/admin_delete",
        type: "post",
        dataType: "json",
        data: data,
        success: function (data) {
            alert("삭제되었습니다.");
            history.go(0);
        }
    })
}
function start() {
    $.ajax({

    })
}