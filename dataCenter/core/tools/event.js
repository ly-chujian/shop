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