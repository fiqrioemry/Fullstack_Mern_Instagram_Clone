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

    const userData = await User.findOne({
      where: { [Op.or]: [{ email: identifier }, { username: identifier }] },
      include: [
        {
          model: Profile,
          as: 'profile',
          attributes: ['avatar'],
        },
      ],
    });

    if (!userData)
      return res.status(404).json({
        message: 'Username or email is not exist',
      });

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch)
      return res.status(400).json({
        message: 'Password is wrong',
      });

    const user = {
      userId: userData.id,
      email: userData.email,
      username: userData.username,
      avatar: userData.profile?.avatar,
    };
    const accessToken = jwt.sign(
      { userId: userData.id },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '1d',
      },
    );

    const refreshToken = jwt.sign(
      { userId: userData.id },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: '7d',
      },
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 7 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'Login is success',
      data: { accessToken, user },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Login is failed',
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

    res.status(200).json({
      payload,
    });
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

    res.status(200).json({
      accessToken,
    });
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
  userAuthRefresh,
  userAuthCheck,
};
