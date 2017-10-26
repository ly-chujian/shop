/**
 * Created by wupeng5 on 2017/8/30.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//person.anything = {x:[3,4,{y:'change'}]}
//person.markModified('anything');//传入anything，表示该属性类型发生变化
//person.save();

var autoTestSchema = new Schema({

    before:{
        isBefore:String,      //是否需要before
        beforeType:String,   //before 发送请求的类型  post get
        beforeUrl:String,    //before url
        beforeData:Schema.Types.Mixed //发送请求附带的参数为json对象
    },

    describe:String,   // 测试用例描述
    //{
    //    url:String,         //发送请求url
    //    sendType:String,    //发送请求类型
    //    sendData:Schema.Types.Mixed,    //发送数据json对象
    //    itemDesc:String,    //当前测试用例下的某个API测试描述，如 用户登录模块测试下面的，用户注册，用户登录，忘记密码为3个模块
    //}
    items:Array,

    operator:String,   //操作人
    runTime:Date      //运行时间
});

module.exports = mongoose.model('autoTest',autoTestSchema);