/**
 * Created by wupeng5 on 2017/8/30.
 */

'use strict';

var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.post("/add",controller.personCtl.savePerson);
router.get("/list",controller.personCtl.getList);
router.post("/edit",controller.personCtl.editPerson);
router.get("/getPersonById/:id",controller.personCtl.getPersonById);
router.get("/deletePerson",controller.personCtl.deletePerson);

module.exports = router;