/**
 * Created by wupeng5 on 2017/8/30.
 */

'use strict';

var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.post("/register",controller.loginCtl.register);
router.post("/login",controller.loginCtl.login);
router.post("/logOut",controller.loginCtl.logOut);
router.get("/check",controller.loginCtl.check);

module.exports = router;