const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/user_controller');

router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);
router.get('/view',usersController.view);
router.get('/destroylink/:id',passport.checkAuthentication,usersController.destroylink);
router.post('/createlink',passport.checkAuthentication, usersController.createlink);
router.post('/create-profile/:id', usersController.createprofile);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
    
), usersController.createSession);




module.exports = router;