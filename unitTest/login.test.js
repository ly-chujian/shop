/**
 * Created by wupeng5 on 2017/9/20.
 */

var request = require('superagent');
var should = require('should');
var expect = require('chai').expect;
var unitTestConfig = require('./config.js');

var logTitle = 'login action test';
var registerUrl = unitTestConfig.base + unitTestConfig.registerUrl;
var loginUrl =  unitTestConfig.base + unitTestConfig.loginUrl;
var logAddUrl = unitTestConfig.base + unitTestConfig.logAdd;

var personListUrl = unitTestConfig.base + unitTestConfig.personListUrl;

//登录模块的测试用例
describe('test login', function () {
    //先植入一个用户
    before(function (done) {
        request.post(registerUrl)
        .send({ name: 'aaa', pwd: 'aaa' })
        .end(function (err, res) {
            if(err){console.log(res.error);}
            done();
        });
    });
    //验证登录是否成功
    it('login action', function (done) {
        request.post(loginUrl)
        .send({name:'aaa', pwd:'aaa'})
        .end(function (err, res) {
            if(err){
                if(res.statusCode == 404){
                    request.post(logAddUrl).send({title:logTitle, content:'API:' + loginUrl + ' 404',type:'1'}).end();
                }else{
                    request.post(logAddUrl).send({title:logTitle, content:res.error,type:'1'}).end();
                }
            }else{
                if(res.body.rc){
                    request.post(logAddUrl).send({title:logTitle, content:'登录成功',type:'1'}).end();
                }else{
                    request.post(logAddUrl).send({title:logTitle, content:'登录失败',type:'1'}).end();
                }
                should.not.exist(err);
            }
            done();
        })
    })

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