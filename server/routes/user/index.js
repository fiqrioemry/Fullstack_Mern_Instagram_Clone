const router = require('express').Router();
const user = require('../../controller/user');
const post = require('../../controller/post');
const follow = require('../../controller/follow');
const { upload } = require('../../middleware/media');
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/profile', isAuthenticate, user.getMyProfile);
router.put(
  '/profile',
  upload().single('avatar'),
  isAuthenticate,
  user.updateProfile,
);
router.get('/', user.searchUser);
router.get('/:username', isAuthenticate, user.getUserProfile);
router.get('/:username/posts', isAuthenticate, post.getUserPosts);
router.post('/:followingId/follow', isAuthenticate, follow.followUser);
router.get('/:username/followers', isAuthenticate, follow.getFollowers);
router.get('/:username/followings', isAuthenticate, follow.getFollowings);

module.exports = router;
