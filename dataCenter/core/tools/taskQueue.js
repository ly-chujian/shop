/**
 * Created by wupeng5 on 2017/11/16.
 */


/**
 * js中的任务队列
 * data为数组
 * process为执行函数
 * context为执行环境，允许为空
 * time为执行间隔事件
 * **/

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