const express = require('express');
const appRoot = require('app-root-path');

const router = express.Router();
const auth = require(appRoot + '/src/api/auth');
const usersRouter = require(appRoot + '/src/api/users');

router.use('/auth', auth);
router.use('/users-with-role', usersRouter)

module.exports = router;
