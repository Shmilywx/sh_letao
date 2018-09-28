$(function () {
    var currentPage = 1;
    var pageSize = 5;
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
    }
})