const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

// router.get('/say-something', controllers.saySomething);
router.post('/login', controllers.login);
router.post('/register', controllers.register);
router.post('/userInfo', controllers.userInfo);

module.exports = router;