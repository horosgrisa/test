const express = require('express');

const router = express.Router();

const authMiddleware = require('../lib/middleware/auth');

const user = require('./user');
const group = require('./group');
const usergroup = require('./usergroup');
const registration = require('./registration');
const login = require('./login');

router.use('/registration', registration);
router.use('/login', login);

router.use('/user', authMiddleware(), user);
router.use('/group', authMiddleware(), group);
router.use('/usergroup', authMiddleware(), usergroup);

module.exports = router;
