$(function () {
    var currentPage = 1;
    var pageSize = 6;
    render();
    function render() {
        $.ajax({
            type: "GET",
            url: "/user/queryUser",
            dataType: "json",
            data: {
                page: currentPage,
                pageSize:pageSize
            },
            success: function (info) {
                // console.log(info);
                var str = template("tpl",info);
                $('tbody').html(str);
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    totalPages:Math.ceil(info.total/info.size),
                    currentPage:info.page,
                    onPageClicked: function (a,b,c,page) {
                        currentPage = page;
                        render();
                    }
                })

            }
        })
        // 禁用功能
        $('.lt_content tbody').on('click','.btn',function () {
            $('#logoutModal').modal("show");
            var id = $(this).parent().data('id');
            var isDelete = $(this).hasClass('btn-success')? 1:0;
            console.log(isDelete);
            console.log(id);
            
            $('#submitBtn').off('click').on('click',function () {
                $.ajax({
                    type: "POST",
                    url: "/user/updateUser",
                    data:{
                        id:id,
                        isDelete:isDelete
                    },
                    dataType: "json",
                    success: function (info) {
                        console.log(info);
                        if(info.success){
                            $('#logoutModal').modal('hide');
                            render();
                        }
                    }
                })
            })
        })
    }
})