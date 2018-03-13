/**
 * Created by wupeng5 on 2017/11/16.
 */

/**
 * 节流函数
 * 因为在段时间内一直操作DOM可能会导致浏览器内存问题，甚至崩溃，所以在一段事件内，我们让该持续性的操作间隔的执行
 * 这就是节流函数存在的意义
 * method：需要执行的函数
 * time：间隔的时间段，单位为毫秒
 * context：执行环境，如果没有，则为window
 * **/

/*********************demo***************************/
//function resizeDiv(){
//    var div = document.querySelector("#div1");
//    div.style.height = div.offsetWidth + "px";
//}
//
//window.onresize = function(){
//    throttle.fire(resizeDiv,10);
//}

var throttle = {
    fire:function(method,time,context){
        clearTimeout(method.tId);
        method.tId = setTimeout(function(){
            method.call(context);
        },time)
    }
}