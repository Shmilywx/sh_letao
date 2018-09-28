// 核实是否登录
$.ajax({
    type: "GET",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function (info) {
        if(info.error === 400){
            location.href = "login.html";
        }
        if(info.success){
            console.log("当前用户已登录");     
        }
    }
})
