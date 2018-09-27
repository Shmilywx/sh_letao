$(document).ajaxStart(function () {
    // 开启进度条
    NProgress.start();
});

$(document).ajaxStop(function () {
    // 模拟网络延迟
    setTimeout(function () {
        // 关闭进度条
        NProgress.done();
    }, 500);
});
$.ajax({
    type: "GET",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function (info) {
        if(info.error===400){
            location.herf = "login.index";
        }
    }
})

$(function () {
    // 伸缩功能
    $('.lt_icon').click(function () {
        $('.lt_aside').toggleClass("hidemenu");
        $('.rt_top').toggleClass("hidemenu");
        $('.rt_main').toggleClass("hidemenu");
    });
    // 二级菜单切换
    $('.category').click(function () {
        $('.child').stop().slideToggle();
    })
    // 退出功能
    $('.rt_icon').click(function () {
        $('#logoutModal').modal("show");
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success:function (info) {
                if(info.success){
                    location.href = "login.html";
                }
            }
        })
    })
    
})