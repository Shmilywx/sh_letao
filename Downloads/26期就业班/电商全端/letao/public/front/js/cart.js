$(function () {
    render();
    function render() {
        setTimeout(function () {
            $.ajax({
                type: "GET",
                url: "/cart/queryCart",
                dataType: "json",
                success: function (info) {
                    console.log(info);
                    if(info.error===400){
                        location.href = "login.html";
                    }else{
                        var str = template('user',{list:info});
                        $('.mui-scroll ul').html(str);
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    }
                }
            })
        },500);
    }
    mui.init({
        // 配置下拉刷新或者上拉加载
        pullRefresh: {
            container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            // 配置下拉刷新
            down: {
                auto: true, // 一进入页面, 默认刷新一次
                callback: function () {
                    render();
                    console.log("下拉刷新了, 需要请求数据, 重新渲染");

                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    // 删除功能

    $('#del').on('tap','.btn_delete',function () {
        var id = $(this).parent().data('id');
        // console.log(id);
        $.ajax({
            type: 'get',
            url: '/cart/deleteCart',
            dataType: 'json',
            data: {
                id: [id]
            },
            success: function (info) {
                // console.log(info);
                if(info.success){
                    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                }
                
            }
        })
        
    })
})