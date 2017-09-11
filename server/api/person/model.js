/**
 * Created by wupeng5 on 2017/8/30.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    name:String,
    age:String,
    address:String
});

module.exports = mongoose.model('Person',personSchema);