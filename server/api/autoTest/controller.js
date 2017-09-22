/**
 * Created by wupeng5 on 2017/8/30.
 */

var FsTool = require("../../fs/fs.js");
var exec = require('child_process').exec;

var fileName  = "a.test.js";
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
    }
}

exports.autoTestCtl = autoTestCtl;