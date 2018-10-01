$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            type: "GET",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                    var str = template("second", info);
                    $("tbody").html(str);
                    // 进行分页初始化
                    $('#paginator').bootstrapPaginator({
                        bootstrapMajorVersion: 3,
                        currentPage : info.page,
                        totalPages : Math.ceil(info.total / info.size),
                        onPageClicked:function (a,b,c,page) {
                            currentPage = page;
                            render();
                        }
                    })
            }
        })
    }
    // 点击按钮显示添加模态框
    $('#add').on("click",function () {

        $('#addModal').modal('show');
        $.ajax({
            type: "GET",
            url: "/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                
                var str = template('drop',info);
                $(".dropdown-menu").html(str);
            }
        })
    })
    // 给下拉列表中的a添加点击事件，获取a的文本设置给按钮
    $('.dropdown-menu').on('click','a',function () {
        var txt = $(this).text();
        $('#dropdownTxt').text(txt);
        var id = $(this).data("id");
        $('[name="categoryId"]').val(id);
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })
    // 上传文件
    $('#fileupload').fileupload({
        dataType: "json",
        done:function (e,data) {
            var picUrl = data.result.picAddr;
            $('#imgBox img').attr("src",picUrl);
            $('[name="brandLogo"]').val(picUrl);
            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }

    })
    // 进行表单校验初始化
    $("#form").bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',      // 校验成功
            invalid: 'glyphicon glyphicon-remove',   // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请选择图片"
                    }
                }
            }
        }
    });
    // 注册表单校验成功事件
    $('#form').on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data:$('#form').serialize(),
            dataType: "json",
            success: function (info) {
                if(info.success){
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();
                    // 重置表单                  
                    $('#form').data("bootstrapValidator").resetForm(true);
                    $('#dropdownTxt').text("请选择一级分类");
                    $('#imgBox img').attr("src", "images/none.png");
                }
            }
        })
    })

})

