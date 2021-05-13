const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

// router.get('/say-something', controllers.saySomething);
router.post('/login', controllers.login);
router.post('/register', controllers.register);
router.post('/userInfo', controllers.userInfo);
router.post('newGame', controllers.newGame);
router.post('/stats', controllers.updateStats);
router.post('/updatePassword', controllers.updatePassword);
router.post('/validate', controllers.validate);

module.exports = router;