/**
 * Created by wupeng5 on 2017/8/30.
 */

var FsTool = require("../../fs/fs.js");
var exec = require('child_process').exec;

var fileName  = "a.test.js";

var AutoTest = require('./model.js');
var Q = require('q');

var autoTestCtl = {
    run1:function(req,res){
        FsTool.write("a.test.js","function a(){\r\nalert(1);\r\n};\r\n a();").then(function (d) {
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
    getItemById:function(req,res){
        var id = req.params.id;
        AutoTest.findById(id,function(err,doc){
            console.log(doc);
            if(err){
                return res.status(200).json({rc:false,data:error});
            }else{
                return res.status(200).json({rc:true,data:doc});
            }
        });
    }
}

exports.autoTestCtl = autoTestCtl;