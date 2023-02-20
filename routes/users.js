const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/login', userController.login);
router.get('/signup', userController.signup);

router.post('/create-user', userController.createUser);

router.post('/create-session', passport.authenticate('local'),userController.createSession);

module.exports = router;