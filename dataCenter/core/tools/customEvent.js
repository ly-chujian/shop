/**
 * Created by wupeng5 on 2017/11/15.
 */

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
