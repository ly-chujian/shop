/**
 * Created by wupeng5 on 2017/8/30.
 */

var Login = require('./model.js');

var loginCtl = {
    login:function(req,res){

        var name = req.body.name;
        var pwd = req.body.pwd;
        if(!name || !pwd){
            return res.status(200).json({rc:false,data:"用户名或密码不允许为空!"});
        }
        Login.find({name:req.body.name,pwd:req.body.pwd},function(err,docs){
            if(err){
                return res.status(200).json({rc:false,data:err});
            }else{
                if(docs.length == 1){
                    req.session.user = docs[0];
                    console.log(req.session.user);
                    return res.status(200).json({rc:true,data:"登录成功!"});
                }else{
                    return res.status(200).json({rc:false,data:"账号密码错误!"});
                }
            }
        })
    },
    logOut:function(req,res){
        req.session.user = null;
        return res.status(200).json({rc:true,data:"退出成功!"});
    },
    check:function(req,res){
        if(req.session.user){
            return res.status(200).json({rc:true,data:req.session.user});
        }else{
            return res.status(200).json({rc:false,data:"not ok!"});
        }
    }
}

exports.loginCtl = loginCtl;