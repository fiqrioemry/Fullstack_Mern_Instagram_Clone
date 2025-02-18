const express = require('express');
const {
  userSignUp,
  userSignIn,
  userSignOut,
  userAuthCheck,
  userAuthRefresh,
  sendingOTP,
  verifyOTP,
} = require('../../controller/auth');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = express.Router();

router.post('/send-otp', sendingOTP);
router.post('/verify-otp', verifyOTP);
router.post('/signup', userSignUp);
router.post('/signin', userSignIn);
router.post('/signout', userSignOut);
router.post('/refresh', userAuthRefresh);
router.get('/me', isAuthenticate, userAuthCheck);

module.exports = router;
