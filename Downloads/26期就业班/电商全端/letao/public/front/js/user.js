$(function () {
    $.ajax({
        type: "GET",
        url: "/user/queryUserMessage",
        dataType: "json",
        success: function (info) {
            console.log(info);
            if(info.error===400){
                location.href = "login.html";
                return;
            }
            var str = template('user',info);
            $('#userInfo').html(str);
            
        }
    })
    // 用户退出功能
    $('#logout').click(function () {
        $.ajax({
            type: 'GET',
            url: '/user/logout',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if(info.success){
                    location.href = "login.html";
                }
                
            }
        })
    })
})