
/**
 * 单页面通信，订阅 + 发布
 * on为注册
 * broadcast为执行，一旦broadcast执行，会主动推送消息到on注册的地方
 * **/
var EventPublisher = function(){

    this.eventCallbackDictionary = {};

    this.on = function(eventName,callback){
        this.eventCallbackDictionary[eventName] = callback;
    }

    this.broadcast = function(eventName,data){
        for(var i in this.eventCallbackDictionary){
            if(i == eventName && this.eventCallbackDictionary[eventName]){
                this.eventCallbackDictionary[eventName](data);
                //this.eventCallbackDictionary[eventName] = null;
            }
        }
    }
}
var eventCtl = new EventPublisher();