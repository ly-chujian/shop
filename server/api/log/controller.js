/**
 * Created by wupeng5 on 2017/8/30.
 */

var Log = require('./model.js');

var logCtl = {
    addLog:function(req,res){
        var date = new Date();
        var log = new Log({
            title:req.body.title,
            date:date.toLocaleDateString() + " " + date.toLocaleTimeString(),
            content:req.body.content,
            type:req.body.type
        });
        log.save(function(error,doc){
            if(error){
                return res.status(200).json({rc:false,data:error});
            }else{
                console.log("log insert success!");
                return res.status(200).json({rc:true,data:doc});
            }
        });
    },
    delLog:function(req,res){
        var ids = req.query.id.split(',');
        console.log(ids);
        Log.remove({ _id: { $in: ids } },function(error,doc){
            if(error){
                return res.status(200).json({rc:false,data:error});
            }else{
                console.log("log delete success!");
                return res.status(200).json({rc:true,data:doc});
            }
        });
    },
    list:function(req,res){
        Log.find({title:new RegExp(req.query.title)},function(error,d){
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
    }
}

exports.logCtl = logCtl;