const express = require('express');
const router = express.Router();
const appRoot = require('app-root-path');
const usersController = require('./util/users.controller');
const passport = require(appRoot + '/passport');

router.post('/',
    passport.authenticate("jwt", { session: false }),
    usersController.createUserWithRoles
);

router.get('/all-users/:role',
    passport.authenticate("jwt", { session: false }),
    usersController.getAllUsersWithRole
);

router.get('/:userId',
    passport.authenticate("jwt", { session: false }),
    usersController.getUser
);

module.exports = router;
