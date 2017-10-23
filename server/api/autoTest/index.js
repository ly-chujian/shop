/**
 * Created by wupeng5 on 2017/8/30.
 */

'use strict';

var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.post("/add",controller.autoTestCtl.add);
router.post("/edit/:id",controller.autoTestCtl.edit);
router.get("/remove",controller.autoTestCtl.del);
router.get("/list",controller.autoTestCtl.list);
router.get("/getItems/:ids",controller.autoTestCtl.getItemByIds);

router.get("/run",controller.autoTestCtl.run);

module.exports = router;