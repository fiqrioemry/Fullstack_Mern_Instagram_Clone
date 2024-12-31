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

router.get("/profile", isAuthenticate, getMyProfile);
router.put(
  "/profile",
  upload("image").single("file"),
  isAuthenticate,
  updateMyProfile
);
router.get("/:username/posts", isAuthenticate);
router.post("/:userId/follow", isAuthenticate, followNewUser);
router.delete("/:userId/follow", isAuthenticate, unfollowUser);
router.get("/recommend", isAuthenticate, getFollowRecommendations);
router.get("/:userId/followers", isAuthenticate, getUserFollowers);
router.get("/:userId/following", isAuthenticate, getUserFollowings);

module.exports = router;
