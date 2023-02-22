const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/login', userController.login);
router.get('/signup', userController.signup);
router.get('/profile' ,passport.checkAuthentication ,userController.profile);
router.get('/feed', passport.checkAuthentication, userController.feed);
router.post('/create-user', userController.createUser);
router.get('/logout', userController.logout);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/login'}
    ),userController.createSession);

module.exports = router;