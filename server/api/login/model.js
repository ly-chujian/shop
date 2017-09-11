/**
 * Created by wupeng5 on 2017/8/30.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginSchema = new Schema({
    name:String,
    pwd:String
});

module.exports = mongoose.model('Login',loginSchema);