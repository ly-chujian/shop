/**
 * Created by wupeng5 on 2017/8/30.
 */

var FsTool = require("../../fs/fs.js");
var child_process = require('child_process');

var fileName  = "a.test.js";

var AutoTest = require('./model.js');
var Q = require('q');

var autoTestCtl = {
    writeFileByDoc:function(doc){
        var logAddUrl = "http://s.com/api/log/add";
        var strs = [];
        strs.push("var request = require('superagent');");
        strs.push("var should = require('should');");
        strs.push("var expect = require('chai').expect;");
        strs.push("var logAddUrl = '"+logAddUrl+"';");

        strs.push("describe('"+doc.describe+"', function () {");

        if(doc.before.isBefore == "true"){
            strs.push("before(function (done) {");
            if(doc.before.beforeType == "get"){
                strs.push("request.get('"+doc.before.beforeUrl+"')");
            }else{
                strs.push("request.post('"+doc.before.beforeUrl+"')");
                strs.push(".send("+doc.before.beforeData+")");
            }
            strs.push(".end(function (err, res) {");
            strs.push("if(err){console.log(res.error);}");
            strs.push("done();");
            strs.push("});");
            strs.push("});");
        }
        var tmp = doc.items;
        /* 允许多个API测试 */
        for(var i=0;i<tmp.length;i++){
            strs.push("it('"+tmp[i].itemDesc+"', function (done) {");
            strs.push("var logTitle = '"+tmp[i].itemDesc+" test';");
            if(tmp[i].sendType == "get"){
                strs.push("request.get('"+tmp[i].url+"')");
            }else{
                strs.push("request.post('"+tmp[i].url+"')");
                strs.push(".send("+tmp[i].sendData+")");
            }
            strs.push(".end(function (err, res) {");
            strs.push("if(err){");
            strs.push("if(res.statusCode == 404){");
            strs.push("request.post(logAddUrl).send({title:logTitle, content:'api ["+tmp[i].url+"] 404',type:'1'}).end();");
            strs.push("}else{");
            strs.push("request.post(logAddUrl).send({title:logTitle, content:res.error,type:'1'}).end();");
            strs.push("}");
            strs.push("}else{");
            strs.push("if(res.body.rc){");
            strs.push("request.post(logAddUrl).send({title:logTitle, content:'api ["+tmp[i].url+"] operator success',type:'1'}).end();");
            strs.push("}else{");
            strs.push("request.post(logAddUrl).send({title:logTitle, content:'api ["+tmp[i].url+"] operator failed',type:'1'}).end();");
            strs.push("}");
            strs.push("should.not.exist(err);");
            strs.push("}");
            strs.push("done();");
            strs.push("});");
            strs.push("});");
        }
        strs.push("});");

        return strs.join("\r\n");
    },
    run:function(req,res){
        var ids = req.query.id.split(',');
        console.log(11111,ids);
        var promiseArr = [];
        autoTestCtl.getItems(ids).then(function(d){
            console.log(22222,d);
            for(var i = 0;i< d.length;i++){
                promiseArr.push(FsTool.write(ids[i] + "_"+ new Date().getTime() + ".test.js",autoTestCtl.writeFileByDoc(d[i].data)));
            }

            Q.all(promiseArr).then(function(d){
                console.log(333333,d);
                var y = [];
                var n = [];
                var count = 0;
                (function(arr){
                    if(count == arr.length){
                        console.log("completed");
                        return res.status(200).json({status:"200",msg:"",data:{y:y,n:n}});
                    }
                    if(arr[count].rc){
                        y.push(arr[count].data.fileName);
                        child_process.exec("mocha " + FsTool.getFullPath(arr[count].data.fileName));
                    }else{
                        n.push(arr[count].data.fileName);
                    }
                    count++;
                    var arg = arguments;
                    setTimeout(function(){ arg.callee(arr); },2000);
                })(d);
            })
        })
    },
    run1:function(req,res){
        var _path = FsTool.getFullPath(fileName);
        console.log(_path);
        var arr = [FsTool.getFullPath("a.test.js"),FsTool.getFullPath("login.test.js")];
        for(var i=0;i<arr.length;i++){
            exec("mocha " + arr[i]);
        }
        return res.status(200).json({status:"200",msg:"",data:null});
    },
    add:function(req,res){
        var describe = req.body.describe;
        var before = req.body.before;
        var items = req.body.items;
        var operator = req.session.user.name;
        if(!req.session.user){
            return res.status(200).json({status:"701",msg:"未登录!",data:null});
        }
        var runTime = new Date().getTime();

        var at = new AutoTest({
            before:before,describe:describe,items:items,operator:operator,runTime:runTime
        })
        if(at.before.beforeData){
            at.markModified(at.before.beforeData);
        }
        at.markModified(at.items);
        at.save(function(error,doc){
            if(error){
                return res.status(200).json({status:"500",msg:"异常!",data:error});
            }else{
                return res.status(200).json({status:"200",msg:"",data:doc});
            }
        });
    },
    edit:function(req,res){
        var id = req.params.id;
        var describe = req.body.describe;
        var before = req.body.before;
        var items = req.body.items;
        var operator = req.session.user.name;
        var runTime = new Date().getTime();
        console.log(id,describe,before,items);
        AutoTest.findByIdAndUpdate(id,{
            before:before,describe:describe,items:items,operator:operator,runTime:runTime
        },function(error,doc){
            if(error){
                return res.status(200).json({status:"500",msg:"异常!",data:error});
            }else{
                return res.status(200).json({status:"200",msg:"",data:doc});
            }
        })
    },
    del:function(req,res){
        var ids = req.query.id.split(',');
        console.log(ids);
        AutoTest.remove({ _id: { $in: ids } },function(error,doc){
            if(error){
                return res.status(200).json({status:500,data:error,msg:"异常",params:{}});
            }else{
                return res.status(200).json({status:200,data:doc,msg:"",params:{}});
            }
        });
    },
    list:function(req,res){
        AutoTest.find({describe:new RegExp(req.query.describe)},function(error,d){
            if(error){
                res.status(200).json({status:500,data:error,msg:"异常",params:{}});
            }else{
                var data = {
                    count:105,
                    total: 10,
                    data:d
                }
                res.status(200).json({status:200,data:data,msg:"",params:{}});
            }
        })
    },
    getItems:function(ids){
        var defer = Q.defer();
        var promiseArr = [];
        for(var i=0;i<ids.length;i++){
            promiseArr.push(autoTestCtl.getOne(ids[i]));
        }
        Q.all(promiseArr).then(function(d){
            defer.resolve(d);
        })
        return defer.promise;
    },
    getItemByIds:function(req,res){
        var ids = req.params.ids.split(',');
        autoTestCtl.getItems(ids).then(function(d){
            res.status(200).json({status:200,data:d,msg:"",params:{}});
        })
    },
    getOne:function(id){
        var defer = Q.defer();
        //var id = req.params.id;
        AutoTest.findById(id,function(err,doc){
            if(err){
                defer.resolve({status:500,data:err,msg:"异常",params:{}});
            }else{
                defer.resolve({status:200,data:doc,msg:"",params:{}});
            }
        });
        return defer.promise;
    }
}

exports.autoTestCtl = autoTestCtl;