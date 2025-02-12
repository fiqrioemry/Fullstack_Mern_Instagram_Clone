const express = require('express');
const {
  userSignUp,
  userSignIn,
  userSignOut,
  userAuthCheck,
  userAuthRefresh,
} = require('../../controller/auth');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = express.Router();

router.post('/signup', userSignUp);
router.post('/signin', userSignIn);
router.post('/signout', userSignOut);
router.post('/refresh', userAuthRefresh);
router.get('/me', isAuthenticate, userAuthCheck);

module.exports = router;
