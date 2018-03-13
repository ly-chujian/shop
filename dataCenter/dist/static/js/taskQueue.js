/**
 * Created by wupeng5 on 2017/11/16.
 */


/**
 * js中的任务队列,在一些特定的环境，比如我有个数组，有个函数，
 * 这个需要每隔2秒去逐步执行这个函数（参数为这个数组里面的每一项），这个小工具就可以用上了
 * data为数组
 * process为执行函数
 * context为执行环境，允许为空
 * time为执行间隔事件
 * **/

    /*********************demo***************************/
    //var data = [{name:1},{name:2},{name:3},{name:4},{name:5},{name:6},{name:7}];
    //
    //function print(item){
    //    console.log(item.name);
    //}
    //taskTool.taskQueue(data,print,2000);

var taskTool = {
    taskQueue:function(array,process,time,context){
        setTimeout(function(){
            var item = array.shift();
            process.call(context,item);
            if(array.length >0){
                setTimeout(arguments.callee,time);
            }
        },100)
    }
}