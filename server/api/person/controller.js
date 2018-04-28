/**
 * Created by wupeng5 on 2017/8/30.
 */

var Person = require('./model.js');
var EnumCtl = require('../enmuTable/controller.js');
var Q = require('q');

function getAgeByCode(code,data){
    var tmp = "";
    for(var i =0;i<data.length;i++){
        if(code.toString() == data[i].code.toString()){
            tmp = data[i].name;
            break;
        }
    }
    return tmp;
}

function convertAge(ages,data){
    var res = [];
    for(var i=0;i<data.length;i++){
        var tmp = {};
        tmp._id = data[i]._id;
        tmp.name = data[i].name;
        tmp.ageCode = data[i].age;
        tmp.ageName = getAgeByCode(data[i].age,ages);
        tmp.address = data[i].address;
        res.push(tmp);
    }
    return data;
}

var personCtl = {
    getPerson:function(name){
        var defer = Q.defer();
        Person.find({name:new RegExp(name)},function(error,d){
            if(error){
                defer.resolve({rc:false,data:error});
            }else{
                var data = {
                    count:d.length,
                    total: 1,
                    data:d
                }
                defer.resolve({rc:true,data:data});
            }
        })
        return defer.promise;
    },
    savePerson:function(req,res){
        var per = new Person({name:req.body.name,age:req.body.age,address:req.body.address});
        per.save(function(error,doc){
            if(error){
                return res.status(200).json({rc:false,data:error});
            }else{
                console.log("insert success!");
                return res.status(200).json({rc:true,data:doc});
            }
        });
    },
    //mongoose查询出来的其实不是你的User Object，只是mongoose的model，所以对它赋值没有任何用处。
    getList:function(req,res){
        var promiseAge = EnumCtl.enmuCtl.getEnmuByType("AGE");
        var promisePerson = personCtl.getPerson(req.query.name);
        Q.all([promiseAge,promisePerson]).then(function(data){
            if(data[0].rc && data[1].rc){
                var tmp = convertAge(data[0].data[0].code,data[1].data.data);
                var result = {
                    data:tmp,
                    count:tmp.length,
                    total:1
                }
                return res.status(200).json({status:"200",msg:"",data:result});
            }else{
                return res.status(200).json({status:"400",msg:"查询出错",data:null});
            }
        })
    },
    editPerson:function(req,res){
        var id = req.body.id;
        Person.findByIdAndUpdate(id,{name:req.body.name,age:req.body.age,address:req.body.address},function(error,doc){
            console.log(doc);
            if(error){
                return res.status(200).json({rc:false,data:error});
            }else{
                return res.status(200).json({rc:true,data:doc});
            }
        })
    },
    getPersonById: function (req, res) {
        var id = req.params.id;
        Person.findById(id,function(err,doc){
            console.log(doc);
            if(err){
                return res.status(200).json({rc:false,data:error});
            }else{
                return res.status(200).json({rc:true,data:doc});
            }
        });
    },
    deletePerson:function(req,res){
        var ids = req.query.id.split(',');
        console.log(ids);
        Person.remove({ _id: { $in: ids } },function(error,doc){
            if(error){
                return res.status(200).json({rc:false,data:error});
            }else{
                return res.status(200).json({rc:true,data:doc});
            }
        });
    }
}

exports.personCtl = personCtl;