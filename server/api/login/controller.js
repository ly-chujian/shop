/**
 * Created by wupeng5 on 2017/8/30.
 */

var Login = require('./model.js');
var Q = require('q');

var loginCtl = {
    login:function(req,res){
        console.log("1aa");
        //var login = new Login({name:req.body.name,pwd:req.body.pwd});
        var _login = new Login({name:"admin",pwd:"admin"});
        _login.save();
    },
    logOut:function(req,res){

    },
    check:function(req,res){

    }
}

exports.loginCtl = loginCtl;