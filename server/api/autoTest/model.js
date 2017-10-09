/**
 * Created by wupeng5 on 2017/8/30.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//person.anything = {x:[3,4,{y:'change'}]}
//person.markModified('anything');//传入anything，表示该属性类型发生变化
//person.save();

var autoTestSchema = new Schema({
    isBefore:Boolean,   //是否需要before
    beforeType:String,  //brfore 发送请求的类型  post get
    beforeData:Schema.Types.Mixed,  //发送请求附带的参数为json对象
    url:String,         //发送请求url
    sendType:String,    //发送请求类型
    sendData:Schema.Types.Mixed,    //发送数据json对象
    describe:String,   // 测试用例描述
    logTitle:String,    //log日志title
    operator:String,   //操作人
    runTime:Date      //运行时间
});

module.exports = mongoose.model('autoTest',autoTestSchema);