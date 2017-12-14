var request = require('superagent');
var should = require('should');
var expect = require('chai').expect;
var logAddUrl = 'http://s.com/api/log/add';
describe('登录模块', function () {
    before(function (done) {
        request.post('/api/reg')
            .send({"name": "aa", "pwd": "abc"})
            .end(function (err, res) {
                if (err) {
                    console.log(res.error);
                }
                done();
            });
    });
    it('登录', function (done) {
        var logTitle = '登录 test';
        request.post('/api/login')
            .send({"name": "aa", "pwd": "abc"})
            .end(function (err, res) {
                if (err) {
                    if (res.statusCode == 404) {
                        request.post(logAddUrl).send({
                            title: logTitle,
                            content: 'api [/api/login] 404',
                            type: '1'
                        }).end();
                    } else {
                        request.post(logAddUrl).send({title: logTitle, content: res.error, type: '1'}).end();
                    }
                } else {
                    if (res.body.rc) {
                        request.post(logAddUrl).send({
                            title: logTitle,
                            content: 'api [/api/login] operator success',
                            type: '1'
                        }).end();
                    } else {
                        request.post(logAddUrl).send({
                            title: logTitle,
                            content: 'api [/api/login] operator failed',
                            type: '1'
                        }).end();
                    }
                    should.not.exist(err);
                }
                done();
            });
    });
});