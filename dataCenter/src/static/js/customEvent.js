/**
 * Created by wupeng5 on 2017/11/15.
 */

/**
 * 自定义事件
 * on为注册，可以在统一句柄上面注册多个事件
 * fire为执行
 * remove为移除
 * 3个方法都支持链式操作，他们都返回this
 * **/

    /*********************demo***************************/
    //var myEvents = new CustomEvent();
    //var fn1 = function(p1,p2){
    //    alert(1111);
    //}
    //var fn2 = function(p1,p2){
    //    alert(222);
    //}
    //myEvents.on("clickA",fn1).on("clickA",fn2);
    //
    //document.querySelector("#btn1").addEventListener("click",function(){
    //    myEvents.fire("clickA").remove("clickA").fire("clickA");
    //},false);

var CustomEvent = function(){
    this._listener = {};
}

//CustomEvent.prototype.constructor = CustomEvent;
CustomEvent.prototype.on = function(type,fn){
    if(typeof type == "string" && typeof fn == "function"){
        if(typeof this._listener[type] == "undefined"){
            this._listener[type] = [fn];
        }else{
            this._listener[type].push(fn);
        }
    }
    //方便链式操作
    return this;
}

CustomEvent.prototype.fire = function(type){
    if(type && this._listener[type]){
        for(var i = 0;i<this._listener[type].length;i++){
            this._listener[type][i].call(this,{target:this,type:type});
        }
    }
    return this;
}

CustomEvent.prototype.remove = function(type,key){
    var fns = this._listener[type];
    if(type && this._listener[type]){
        if (typeof key === "function") {
            for (var i=0;i<fns.length; i++){
                if (fns[i] === key){
                    fns.splice(i, 1);
                    break;
                }
            }
        } else {
            delete this._listener[type];
        }
    }
    return this;
}
