const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/say-something', controllers.saySomething);
router.post('/login', controllers.login);
router.post('/register', controllers.register);

module.exports = router;