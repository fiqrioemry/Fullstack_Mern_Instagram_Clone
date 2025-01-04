const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
  getUserProfile,
  updateUserProfile,
  getFollowRecommend,
  searchUser,
} = require("../../controller/user");
const { getUserPosts } = require("../../controller/post");

const express = require("express");
const router = express.Router();
const { upload } = require("../../middleware/media");
const isAuthenticate = require("../../middleware/isAuthenticate");
router.get("/search", searchUser);
router.get("/:username", isAuthenticate, getUserProfile);
router.put(
  "/",
  upload("image").single("file"),
  isAuthenticate,
  updateUserProfile
);
router.post("/:followingId/follow", isAuthenticate, followUser);
router.get("/:userId/posts", isAuthenticate, getUserPosts);
router.delete("/:followingId/follow", isAuthenticate, unfollowUser);
router.get("/:username/followers", isAuthenticate, getFollowers);
router.get("/:username/followings", isAuthenticate, getFollowings);
router.get("/recommend/follow", isAuthenticate, getFollowRecommend);

module.exports = router;
