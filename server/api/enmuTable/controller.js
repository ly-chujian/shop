/**
 * Created by wupeng5 on 2017/8/30.
 */

var EnumTable = require('./model.js');
var Q = require('q');

var enmuCtl = {
    getEnmuByType:function(type){
        var defer = Q.defer();
        EnumTable.find({name:type},function(error,data){
            if(error){
                defer.resolve({rc:false,data:error});
            }else{
                defer.resolve({rc:true,data:data});
            }
        })
        return defer.promise;
    },
    getValuesByKey:function(req,res){
        //var enums = new EnumTable({name:"AGE",code:[
        //    {name:"<10",code:"1"},
        //    {name:"10-20",code:"2"},
        //    {name:"20-30",code:"3"},
        //    {name:">30",code:"4"}
        //]});
        //enums.save();

        //var name = req.params.key;
        var promise = enmuCtl.getEnmuByType(req.query.key);
        promise.then(function(d){
            return res.status(200).json(d);
        })
    }
}

exports.enmuCtl = enmuCtl;