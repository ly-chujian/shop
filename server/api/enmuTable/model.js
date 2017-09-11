/**
 * Created by wupeng5 on 2017/8/30.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var enumTableSchema = new Schema({
    name:String,
    code:Array
});

module.exports = mongoose.model('EnumTable',enumTableSchema);