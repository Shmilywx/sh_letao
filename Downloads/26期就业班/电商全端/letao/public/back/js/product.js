$(function () {
    var currentPage = 1;
    var pageSize = 2;
    var picArr = [];
    render();
    function render() {
        $.ajax({
            type: "GET",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                // console.log(info);
                var str = template("product", info);
                $("tbody").html(str);
                // 分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    // 点击显示模态框
    $('#add').on('click',function () {
        $('#addModal').modal('show');
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
              page: 1,
              pageSize: 100
            },
            dataType: "json",
            success: function (info) {
                // console.log(info);
                var str = template('second',info);
                $('.dropdown-menu').html(str);
            }
        })
    });
    // 给下拉列表的a注册点击事件
    $('.dropdown-menu').on('click','a',function () {
        var txt = $(this).text();
        $('#dropdownTxt').text(txt);
        var id = $(this).data("id");      
        $('[name="brandId"]').val(id);
        var validator = $("#form").data('bootstrapValidator');
        $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
        
    })
    // 表单初始化
    $('#form').bootstrapValidator({
        // 对隐藏域也校验
        excluded: [],
        // 指定校验时显示的图标, 固定写法
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',      // 校验成功
            invalid: 'glyphicon glyphicon-remove',   // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },

        // 校验字段
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            // 请求库存必须是, 非0开头的数字
            /*
            * 正则, ^ 以...开头, $ 以...结尾
            * [] 内, 表示可以出现的字符
            * [1-9], 表示可以出现 1,2,3,4....9
            * \d 表示 0-9的数字
            *
      
              * 表示 0 个 或 多个
              + 表示 1 个 或 多个
              ? 表示 0 个 或 1个
              {n}   表示出现 n次
              {n,m} 表示出现 n-m 次
      
            * */
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    // 正则校验
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头的数字'
                    }
                }
            },

            // 要求尺码非空, 要求尺码格式 xx-xx,  x为数字
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    // 正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '要求尺码为 xx-xx 的格式, 例如 32-40'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },

            // 用于标记当前图片是否上传满三张
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传三张图片"
                    }
                }
            }
        }
    });
    // 上传文件
    $('#fileupload').fileupload({
        dataType: "json",
        done: function (e,data)  {
            // console.log(data);
            picArr.unshift(data.result);
            var picUrl = data.result.picAddr;
            $('#imgBox').prepend('<img src="' + picUrl + '" width="100" height="100" alt="">');
            if(picArr.length >3){
                $('#imgBox img:last-of-type').remove();
                pic.pop();
            }
            if(picArr.length===3){
                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
            }
        }
    })
    // 表单提交
    $('#form').on("success.form.bv", function (e) {
        e.preventDefault();
        var paramsStr = $('#form').serialize();
        paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
        paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
        paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: paramsStr,
            dataType: "json",
            success: function (info) {
              if(info.success){
                  $('#addModal').modal('hide');
                  currentPage = 1;
                  render();
                  $('#form').data("bootstrapValidator").resetForm(true);
                  $('#dropdownTxt').text("请选择二级分类"); $('#imgBox img').remove();
                  picArr = [];

              }
            }
        })
    });
})