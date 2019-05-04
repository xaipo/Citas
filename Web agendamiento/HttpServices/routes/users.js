'use strict'

var express = require('express');
var router = express.Router();
var UserController= require('../controllers/user')
/* GET users listing. */
var md_auth = require('../middleware/authenticated');

router.get('/test-controller', md_auth.ensureAuth,UserController.pruebas);
router.post('/register', UserController.saveUser);
router.post('/login', UserController.login);

module.exports = router;
