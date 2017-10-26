/**
 * Created by wupeng5 on 2017/9/22.
 */

var path = require('path');
var fs = require('fs');
var Q = require('q');

var fsCtl = {
    getFullPath:function(fileName){
        return path.resolve(__dirname, '../../unitTest/'+fileName);
    },
    //rewrite,完全覆盖
    write:function(fileName,data){
        var _path = this.getFullPath(fileName);
        var defer = Q.defer();
        fs.writeFile(_path,data,function(err){
            if(err){
                defer.resolve({rc:false,data:{fileName:fileName,msg:err}});
            }else{
                defer.resolve({rc:true,data:{fileName:fileName,msg:"ok"}});
            }
        })
        return defer.promise;
    },
    checkFileIsExist:function(fileName){
        var defer = Q.defer();
        fs.existsSync(this.getFullPath(fileName), function (exist) {
            defer.resolve({data:exist});
        })
        return defer.promise;
    }
}

module.exports = fsCtl;