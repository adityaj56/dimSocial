//This file is entry point for all the routes we will define many middlewares for further routing the requests
const express = require('express');

//this contains all the router functions
const router = express.Router();

//As this index.js will handle all the rounting for home directly so we import homeController in here
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comment', require('./comments'));

module.exports = router;