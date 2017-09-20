/**
 * Created by wupeng5 on 2017/8/30.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    title:String,
    date:String,
    content:String,
    type:String, //1表示单元测试结果，2表示用户操作
});

module.exports = mongoose.model('Log',logSchema);