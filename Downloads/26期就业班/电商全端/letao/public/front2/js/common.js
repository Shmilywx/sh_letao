/**
 * Created by Jepson on 2018/10/9.
 */


// 只要在布局时, 给盒子设置了 transform 3d 系列属性, 就会触发 gpu硬件加速
// 可以让手机以最优的性能渲染这个盒子, 提高页面渲染效果

// 创建一个mui区域滚动实例, 就可以调用插件实例方法了
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006,
  indicators: false //是否显示滚动条
});


// 轮播图初始化, 设置轮播周期
// 获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
});


// 通用的解析地址栏参数的函数
function getSearch( k ) {
  // 获取地址栏参数
  var search = location.search;   // "?key=2&name=%E9%B9%8F%E9%B9%8F&age=18"

  // 转码成中文
  search = decodeURI( search );  // "?key=2&name=鹏鹏&age=18"

  // slice(start, end); 从start开始截取, 截取到end结束
  //       包含 start, 不包含end
  //       如果不写 end, 截取到最后
  // 去掉问号
  search = search.slice(1);    // key=2&name=鹏鹏&age=18

  // 得到键值对字符串的数组
  var arr = search.split("&");  // ["key=2", "name=鹏鹏", "age=18"]

  var obj = {};

  // 遍历数组, 取出键和值, 存储到对象中去
  arr.forEach(function( v, i ) {    // v 表示每一项   "age=18"
    var key = v.split("=")[0]; // 键   age
    var value =  v.split("=")[1]; // 值  18

    // 点语法和中括号语法的区别在于, 中括号语法会解析变量
    obj[ key ] = value;
  })

  return obj[ k ];
}
