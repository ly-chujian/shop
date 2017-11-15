/**
 * Created by wupeng5 on 2017/11/15.
 */

var PerformanceTool = function(){

    this.apiArray = [];

    this.start = 0;
    this.end = 0;

    this.checkKeyExist = function(apiKey){
        return this.apiArray.some(function(item){
            return item.key == apiKey;
        })
    }

    this.setStart = function(){
        this.start = new Date().getTime();
    }

    this.compare = function(apiKey){
        if(this.checkKeyExist(apiKey)){
            return;
        }
        this.end = new Date().getTime();
        if(this.start == 0){
            console.log("["+apiKey+"] must set Start function.");
        }else{
            var result = this.end - this.start;
            this.apiArray.push({key:apiKey,val:result});
            this.start = 0;
            console.log("[" + apiKey + "] request time is:" + result + " ms");
        }
    }
}

var performanceTool = new PerformanceTool();