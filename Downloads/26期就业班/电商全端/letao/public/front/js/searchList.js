$(function () {
    var key = getSearch("key");  
    $('.search_input').val(key);
    render();
    // 1获取input框的值，请求数据渲染
    function render() {
        $('.lt_product').html('<div class="loading"></div>');
        var params = {};
        params.proName = $('.search_input').val();
        params.page  = 1;
        params.pageSize = 100;
        // 判断是否需要排序
        var $current = $('.lt_sort a.current');
        if($current.length>0){
            console.log("需要进行排序");
            var sortName = $current.data("type");
            var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
            params[sortName] = sortValue;    
        }
        setTimeout(function () {
            $.ajax({
                type:"get",
                url: "/product/queryProduct",
                data: params,
                dataType: "json",
                success: function (info) {
                    console.log(info);
                    var htmlStr = template('tmp',info);
                    $('.lt_product').html(htmlStr);
                }
            })
        },1000);
    }
    // 2点击搜索按钮，实现搜索功能
    $('.search_btn').click(function () {
        var key = $('.search_input').val();
        // console.log(key);
        var JsonStr = localStorage.getItem("search_list");
        // console.log(JsonStr);
        var arr = JSON.parse(JsonStr);
        console.log(arr);
        var index = arr.indexOf(key);
        if(index>-1){
            arr.splice(index,1);
        }
        if(arr.length >=10){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem("search_list",JSON.stringify(arr));
        render();        
    })
    // 3点击价格或者库存，切换current,实现排序
    $('.lt_sort a[data-type]').click(function () {
        if ($(this).hasClass('fa-angle-down')){
            $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");    
        }else{
            $(this).addClass("current").siblings().removeClass("current");
        }
        render();
    })
})