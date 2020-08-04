var express = require('express');
const { login, signgup } = require('../Controller/UserController');
var router = express.Router();

router.post('/signup', signgup);
router.post('/login', login);

module.exports = router;