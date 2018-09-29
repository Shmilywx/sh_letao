$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
          type: "GET",
          url: "/category/queryTopCategoryPaging",
          data:{
              page:currentPage,
              pageSize:pageSize
          },
          dataType: "json",
          success: function (info) {
            //   console.log(info);
              var str = template('first',info);
              $("tbody").html(str);
           
              

              $('#paginator').bootstrapPaginator({
                  bootstrapMajorVersion:3,
                  currentPage:info.page,
                  totalPages:Math.ceil(info.total/info.size),
                  onPageClicked: function (event, originalEvent, type, page) {
                      currentPage = page;
                      render();
                  }
              })
          }
        })
    }
    // 点击添加模态框
    $("#add").on('click', function () {
        $('#addModal').modal("show");
    })
    // 表单校验功能
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',      // 校验成功
            invalid: 'glyphicon glyphicon-remove',   // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        fields: {
            categoryName: {
                // 配置校验规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: "请输入一级分类名称"
                    }
                }
            }
        }
    })
    // 注册表单校验成功事件
    $('#form').on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/category/addTopCategory",
            data: $('#form').serialize(),
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $('#addModal').modal("hide");
                    currentPage = 1;
                    render();
                    $('#form').data("bootstrapValidator").resetForm(true);
                }
            }
        })
    })
})




