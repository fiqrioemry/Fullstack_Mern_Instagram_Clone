const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { User, Profile } = require('../../models');
const randomAvatar = require('../../utils/randomAvatar');

async function userSignUp(req, res) {
  try {
    const { username, email, password, fullname } = req.body;

    const existUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (existUser)
      return res.status(400).json({
        success: false,
        message: 'Username or Email already exist',
      });
    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const avatar = randomAvatar();
    await Profile.create({
      userId: newUser.id,
      fullname,
      avatar,
    });

    return res.status(201).json({ message: 'Registration is success' });
  } catch (error) {
    return res.status(500).json({
      message: 'Registration is failed',
      error: error.message,
    });
  }
}

async function userSignIn(req, res) {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      where: { [Op.or]: [{ email: identifier }, { username: identifier }] },
      include: [
        {
          model: Profile,
          as: 'profile',
          attributes: ['avatar'],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: 'Username or email does not exist',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Password is incorrect',
      });
    }

    // Generate Access Token (Short-lived)
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN,
      { expiresIn: '15m' },
    );

    // Generate Refresh Token (Long-lived)
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN,
      { expiresIn: '7d' },
    );

    // Set HTTP-Only Cookie for Refresh Token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send Response with Access Token (Do not store it in Cookie)
    res.status(200).json({
      message: 'Login successful',
      accessToken, // Frontend should store this in memory (not in Cookie)
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Login failed',
      error: error.message,
    });
  }
}

async function userSignOut(req, res) {
  delete req.headers.authorization;

  res.clearCookie('refreshToken');

  return res.status(200).json({ message: 'Logout is success' });
}

async function userAuthCheck(req, res) {
  const { userId } = req.user;

  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Profile, as: 'profile' }],
    });

    if (!user)
      return res.status(401).json({ message: 'Unauthorized Access !!!' });

    const payload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      avatar: user.profile?.avatar,
    };

    res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to get Authorization',
      error: error.message,
    });
  }
}

async function userAuthRefresh(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: 'Session is Expired, Please log in',
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

    const userId = decoded.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'Invalid refresh token, please log in',
      });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN,
      { expiresIn: '30m' },
    );

    res.status(200).json(accessToken);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to refresh token',
      error: error.message,
    });
  }
}

module.exports = {
  userSignIn,
  userSignUp,
  userSignOut,
  userAuthCheck,
  userAuthRefresh,
};
