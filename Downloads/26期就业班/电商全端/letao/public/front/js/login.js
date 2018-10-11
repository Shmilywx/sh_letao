$(function () {
    $('#loginBtn').click(function () {
        var user = $('#username').val();
        var password = $('#password').val();
        if (user.trim() === "") {
            mui.toast("请输入用户名");
            return;
        }

        if (password.trim() === "") {
            mui.toast("请输入密码");
            return;
        }
        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                username: user,
                password: password
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if(info.error===403){
                    mui.toast('用户名或密码错误');
                    return;
                }
                if(info.success){
                    if (location.search.indexOf("retUrl") != -1) {
                        // 解析出 retUrl, 跳转回去
                        location.href = location.search.replace("?retUrl=", "");
                    }
                    else {
                        location.href = "user.html";
                    }
                }
            }
        })
    })
})