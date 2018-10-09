$(function () {
    render();
    // 读取历史记录的方法
    function getHistory() {
        var history = localStorage.getItem("search_list")|| '[]';
        var arr = JSON.parse(history);
        return arr;
    }
    // 读取历史记录，渲染的方法
    function render() {  
        var arr = getHistory();
        console.log(arr);   
        var htmlStr = template('history',{arr:arr});
        $('.lt_history').html(htmlStr);
    }
    // 清空历史记录
    $('.lt_history').on('click','.icon_empty',function () {
        mui.confirm('您确定要清空历史记录吗？','温馨提示',['取消','确认'],function (e) {
            // console.log(e);
            if(e.index===1){
                localStorage.removeItem("search_list");
                render();
            }
            
        })
    })
    // 删除单条历史记录
    $('.lt_history').on('click','.btn_delete',function () {
        var that = this;
        mui.confirm('确定删掉这条数据?','温馨提示',['取消','确认'],function (e) {
            if(e.index===1){           
                var index = $(that).data('index');
                // console.log(index);              
                var arr = getHistory();
                arr.splice(index,1);
                var jsonStr = JSON.stringify(arr);
                localStorage.setItem("search_list",jsonStr);
                render();
            }
        })
    })
    // 添加记录
    $('.search_btn').click(function () {
        var value = $('.search_input').val();
        if(value==''){
            mui.toast('请输入搜索关键字',{
                duration:2500
            });
            return;
        }
        var arr = getHistory();
        var index = arr.indexOf(value);
        if(index > -1){
            arr.splice(index,1);
        }
        if (arr.length >=10){
            arr.pop();
        }
        arr.unshift(value);
        localStorage.setItem('search_list',JSON.stringify(arr));
        render();
        $('.search_input').val('');
        location.href = "searchList.html?key=" + value;
    })
})