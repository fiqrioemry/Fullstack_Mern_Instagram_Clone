const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
  getUserProfile,
  updateUserProfile,
  getFollowRecommend,
} = require("../../controller/user");
const { getUserPosts } = require("../../controller/post");

const express = require("express");
const router = express.Router();
const { upload } = require("../../middleware/media");
const isAuthenticate = require("../../middleware/isAuthenticate");

router.get("/:username", isAuthenticate, getUserProfile);
router.put(
  "/:username",
  upload("image").single("file"),
  isAuthenticate,
  updateUserProfile
);
router.post("/:userId/follow", isAuthenticate, followUser);
router.get("/:username/posts", isAuthenticate, getUserPosts);
router.delete("/:userId/follow", isAuthenticate, unfollowUser);
router.get("/:userId/followers", isAuthenticate, getFollowers);
router.get("/:userId/following", isAuthenticate, getFollowings);
router.get("/recommend", isAuthenticate, getFollowRecommend);

module.exports = router;
