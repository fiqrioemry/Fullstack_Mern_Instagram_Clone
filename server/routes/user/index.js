const {
  getMyProfile,
  updateMyProfile,
  getUserHomeDetails,
} = require("../../controller/user");
const {
  unfollowUser,
  followNewUser,
  getUserFollowers,
  getUserFollowings,

  getFollowRecommendations,
} = require("../../controller/follow");
const express = require("express");
const { upload } = require("../../middleware/media");
const isAuthenticate = require("../../middleware/isAuthenticate");

const router = express.Router();
// user profile setting
router.get("/profile", isAuthenticate, getMyProfile);
router.put(
  "/profile/update",
  upload("image").single("file"),
  isAuthenticate,
  updateMyProfile
);

// user home detail
router.get("/:username", isAuthenticate, getUserHomeDetails);

// followers and followings
router.get("/:username/followers", isAuthenticate, getUserFollowers);
router.get("/:username/followings", isAuthenticate, getUserFollowings);

// follow and unfollow
router.post("/follow", isAuthenticate, followNewUser);
router.delete("/unfollow", isAuthenticate, unfollowUser);

// follow recommendations
router.get("/recommend/follow/user", isAuthenticate, getFollowRecommendations);

module.exports = router;
