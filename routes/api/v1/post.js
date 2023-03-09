const express = require('express');
const passport = require('passport');

const router = express.Router();
const postAPI = require('../../../controllers/api/v1/post_API');

router.get('/', postAPI.index);
router.get('/delete', passport.authenticate('jwt', {session: false}), postAPI.delete);


module.exports = router;