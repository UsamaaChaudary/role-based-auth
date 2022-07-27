const express = require('express');
const router = express.Router();
const appRoot = require('app-root-path');
const authController = require('./util/auth.controller');
const passport = require('passport');


router.post('/signup',
    passport.authenticate('signup', { session: false }),
    authController.signup
);


router.post('/login',
    passport.authenticate('login', { session: false }),
    authController.login
);


// // In this method we will get all bios against platform id
// router.get('/',
//     [auth, platformMiddleware.validatePlatform],
//     usersController.getBiosByPlatformId
// );

// // In this method we will get bio against bio id 
// router.get('/:id',
//     [auth, biosMiddleware.validateBioByParamsId],
//     usersController.getBioById
// );


// router.post('/login',
//     passport.authenticate('login', { session: false }),
//     usersController.createBio
// );

// // In this method we will delete all bios against platform
// router.delete('/delBioByPlatformId',
//     [auth, platformMiddleware.validatePlatform],
//     usersController.deleteBiosByPlatformId
// );

// // In this method we will delete Bio against bio id
// router.delete('/:id',
//     [auth, biosMiddleware.validateBioByParamsId],
//     usersController.deleteBioById
// );

// // In this method we will update Bio 
// router.put('/:id',
//     [auth, userMiddleware.validateUser, platformMiddleware.validatePlatform, biosMiddleware.validateBioByParamsId],
//     usersController.updateBio
// );

module.exports = router;
