/**
 * Created by wupeng5 on 2017/8/30.
 */

var Login = require('./model.js');

var loginCtl = {
    register:function(req,res){
        var login = new Login({name:req.body.name,pwd:req.body.pwd});
        login.save(function(error,doc){
            if(error){
                return res.status(200).json({status:"500",msg:"注册失败!",data:error});
            }else{
                console.log("register success!");
                return res.status(200).json({status:"200",msg:"!",data:doc});
            }
        });
    },
    login:function(req,res){
        var name = req.body.name;
        var pwd = req.body.pwd;
        if(!name || !pwd){
            return res.status(200).json({status:"500",msg:"用户名或密码不允许为空!",data:null});
        }
        Login.find({name:req.body.name,pwd:req.body.pwd},function(err,docs){
            if(err){
                return res.status(200).json({status:"500",msg:"登录异常!",data:err});
            }else{
                if(docs.length >= 1){
                    req.session.user = docs[0];
                    console.log(req.session.user);
                    return res.status(200).json({status:"200",msg:"登录成功!",data:docs});
                }else{
                    return res.status(200).json({status:"500",msg:"账号密码异常!",data:null});
                }
            }
        })
    },
    logOut:function(req,res){
        req.session.user = null;
        return res.status(200).json({status:"200",msg:"!",data:null});
    },
    check:function(req,res){
        if(req.session.user){
            return res.status(200).json({status:"200",msg:"",data:req.session.user});
        }else{
            return res.status(200).json({status:"500",msg:"未登录",data:null});
        }
    }
}

exports.loginCtl = loginCtl;