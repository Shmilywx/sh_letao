$(function () {
    var productId = getSearch('productId');
    console.log(productId);
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id:productId
        },
        dataType: "json",
        success: function (info) {
            console.log(info);
            var str = template("product",info);
            $('.mui-scroll').html(str);
            // 初始化轮播图
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            // 初始化数字窗口
            mui('.mui-numbox').numbox();
        }
    })
    // 给尺码添加选中功能
    $('.lt_main').on('click','.lt_size span',function () {
        $(this).addClass('current').siblings().removeClass('current');
    })
    // 添加到购物车功能
    $('#addCart').click(function () {
        // 获取尺码和数量
        var size = $('.lt_size span.current').text();
        // console.log(size);
        var num = $('.lt_num .mui-numbox-input').val();
        console.log(num);
        if(!size){
            mui.toast('请选择尺码！');
            return;
        }
        $.ajax({
            type: 'POST',
            url: '/cart/addCart',
            data: {
                productId : productId,
                size : size,
                num : num
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if(info.error===400){
                    location.href = "login.html?retUrl=" + location.href;
                }
                if(info.success){
                    mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function (e) {
                        console.log(e);
                        if(e.index ==0){
                            location.href = "cart.html";
                        }
                        
                    })
                }
                
            }
        })
        
        
    })
})