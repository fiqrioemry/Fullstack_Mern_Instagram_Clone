const {
  verifyOTP,
  userSignIn,
  userSignUp,
  sendingOTP,
  googleAuth,
  userSignOut,
  userAuthCheck,
  userAuthRefresh,
  googleAuthCallback,
} = require('../../controller/auth');
const isAuthenticate = require('../../middleware/isAuthenticate');
const express = require('express');
const router = express.Router();

router.post('/signup', userSignUp);
router.post('/signin', userSignIn);
router.post('/signout', userSignOut);
router.post('/send-otp', sendingOTP);
router.post('/verify-otp', verifyOTP);
router.post('/refresh', userAuthRefresh);
router.get('/me', isAuthenticate, userAuthCheck);
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);

module.exports = router;
