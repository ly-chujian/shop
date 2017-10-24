/**
 * Created by wupeng5 on 2017/8/30.
 */

var FsTool = require("../../fs/fs.js");
var exec = require('child_process').exec;

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
        strs.push("var logTitle = '"+doc.logTitle+"';");
        strs.push("var reqUrl = '"+doc.url+"';");
        strs.push("var logAddUrl = '"+logAddUrl+"'");

        strs.push("describe('"+doc.describe+"', function () {");
        if(doc.isBefore){
            strs.push("before(function (done) {");
            if(doc.beforeType == "get"){
                strs.push("request.get('"+doc.beforeUrl+"')");
            }else{
                strs.push("request.post('"+doc.beforeUrl+"')");
                strs.push(".send("+doc.beforeData+")");
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
            if(tmp[i].sendType == "get"){
                strs.push("request.get('"+tmp[i].url+"')");
            }else{
                strs.push("request.post('"+tmp[i].url+"')");
                strs.push(".send("+tmp[i].sendData+")");
            }
            strs.push(".end(function (err, res) {");
            strs.push("if(err){");
            strs.push("if(res.statusCode == 404){");
            strs.push("request.post(logAddUrl).send({title:'"+tmp[i].logTitle+"', content:'API:' + "+tmp[i].url+" + ' 404',type:'1'}).end();");
            strs.push("}else{");
            strs.push("request.post(logAddUrl).send({title:'"+tmp[i].logTitle+"', content:res.error,type:'1'}).end();");
            strs.push("}");
            strs.push("}else{");
            strs.push("if(res.body.rc){");
            strs.push("request.post(logAddUrl).send({title:'"+tmp[i].logTitle+"', content:'api ["+tmp[i].url+"] operator success',type:'1'}).end();");
            strs.push("}else{");
            strs.push("request.post(logAddUrl).send({title:'"+tmp[i].logTitle+"', content:'api ["+tmp[i].url+"] operator failed',type:'1'}).end();");
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
    run1:function(req,res){
        var ids = req.query.id.split(',');
        var promiseArr = [];
        autoTestCtl.getItems(ids).then(function(d){
            for(var i = 0;i< d.length;i++){
                promiseArr.push(FsTool.write(new Date().getTime() + ".test.js",autoTestCtl.writeFileByDoc(d[i])));
            }
        })
        Q.all(promiseArr).then(function(d){
            return res.status(200).json({rc:true,data:d});
        })
    },
    run:function(req,res){
        var _path = FsTool.getFullPath(fileName);
        console.log(_path);
        var arr = [FsTool.getFullPath("a.test.js"),FsTool.getFullPath("login.test.js")];
        for(var i=0;i<arr.length;i++){
            exec("mocha " + arr[i]);
        }
        return res.status(200).json({rc:true,data:"ok"});
    },
    add:function(req,res){
        var url = req.body.url;
        var sendType = req.body.sendType;
        var sendData = req.body.sendData?req.body.sendData:{};
        var describe = req.body.describe;
        var logTitle = req.body.logTitle;
        var operator = req.session.user.name;
        var isBefore = req.body.isBefore;
        var beforeType = req.body.beforeType;
        var beforeData = req.body.beforeData?req.body.beforeData:{};
        var runTime = req.body.runTime;

        var at = new AutoTest({
            url:url,sendType:sendType,sendData:sendData,
            describe:describe,logTitle:logTitle,operator:operator,
            isBefore:isBefore,beforeType:beforeType,beforeData:beforeData,runTime:runTime
        })
        at.save(function(error,doc){
            if(error){
                return res.status(200).json({rc:false,data:error});
            }else{
                console.log("insert success!");
                return res.status(200).json({rc:true,data:doc});
            }
        });
    },
    edit:function(req,res){
        var id = req.body.id;
        var url = req.body.url;
        var sendType = req.body.sendType;
        var sendData = req.body.sendData?req.body.sendData:{};
        var describe = req.body.describe;
        var logTitle = req.body.logTitle;
        var operator = req.session.user.name;
        var isBefore = req.body.isBefore;
        var beforeType = req.body.beforeType;
        var beforeData = req.body.beforeData?req.body.beforeData:{};
        var runTime = req.body.runTime;

        AutoTest.findByIdAndUpdate(id,{
            url:url,sendType:sendType,sendData:sendData,
            describe:describe,logTitle:logTitle,operator:operator,
            isBefore:isBefore,beforeType:beforeType,beforeData:beforeData,runTime:runTime
        },function(error,doc){
            if(error){
                return res.status(200).json({rc:false,data:error});
            }else{
                return res.status(200).json({rc:true,data:doc});
            }
        })
    },
    del:function(req,res){
        var ids = req.query.id.split(',');
        console.log(ids);
        AutoTest.remove({ _id: { $in: ids } },function(error,doc){
            if(error){
                return res.status(200).json({rc:false,data:error});
            }else{
                return res.status(200).json({rc:true,data:doc});
            }
        });
    },
    list:function(req,res){
        AutoTest.find({describe:new RegExp(req.query.describe)},function(error,d){
            if(error){
                res.status(200).json({rc:false,data:error});
            }else{
                var data = {
                    count:d.length,
                    total: 1,
                    data:d
                }
                res.status(200).json({rc:true,data:data});
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
            res.status(200).json({rc:true,data:d});
        })
    },
    getOne:function(id){
        var defer = Q.defer();
        //var id = req.params.id;
        AutoTest.findById(id,function(err,doc){
            console.log(doc);
            if(err){
                defer.resolve({rc:false,data:error});
            }else{
                defer.resolve({rc:true,data:doc});
            }
        });
        return defer.promise;
    }
}

exports.autoTestCtl = autoTestCtl;