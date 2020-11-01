'use strict';
var pk_id = localStorage.getItem("#pk_id", pk_id);
start()

function start() {

    var data = {
        pk_id: pk_id
    }

    $.ajax({
        url: "/blog_edit",
        dataType: "json",
        type: "get",
        data: data,

        success: function (data) {
            var data = data;
            var pk_id = data[0].pk_id
            var content = data[0].content
            console.log("start -> content", content)

            var html = ''
            html += '"' + content + '"'
            $("#content_box").html(html)

        },

        error: function (data) {
            console.log(data)
        }
    })



}
