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
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const user = req.user;

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' },
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' },
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    res.redirect(`http://localhost:3000/dashboard?token=${accessToken}`);
  },
);

module.exports = router;
