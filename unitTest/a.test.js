/**
 * Created by wupeng5 on 2017/9/20.
 */

var request = require('superagent');
var should = require('should');
var expect = require('chai').expect;
var unitTestConfig = require('./config.js');

var logTitle = 'person action test';
var personListUrl = unitTestConfig.base + unitTestConfig.personListUrl;
var logAddUrl = unitTestConfig.base + unitTestConfig.logAdd;

describe('test person', function () {
    it('person action', function (done) {
        request.get(personListUrl)
            .end(function (err, res) {
                if(err){
                    if(res.statusCode == 404){
                        request.post(logAddUrl).send({title:logTitle, content:'API:' + personListUrl + ' 404',type:'1'}).end();
                    }else{
                        request.post(logAddUrl).send({title:logTitle, content:res.error,type:'1'}).end();
                    }
                }else{
                    if(res.body.rc){
                        request.post(logAddUrl).send({title:logTitle, content:'获取person列表成功',type:'1'}).end();
                    }else{
                        request.post(logAddUrl).send({title:logTitle, content:'获取person列表失败',type:'1'}).end();
                    }
                    should.not.exist(err);
                }
                done();
            })
    })
})
