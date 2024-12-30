const express = require("express");

const {
  createNewPost,
  updateMyPost,
  deleteMyPost,
  getAllPublicPosts,
  getAllFollowingPosts,
  getUserPosts,
  getPostDetail,
} = require("../../controller/post");
const { upload } = require("../../middleware/media");
const { createCommentOrReply } = require("../../controller/comment");
const isAuthenticate = require("../../middleware/isAuthenticate");
const router = express.Router();

// post
router.get("/explore", isAuthenticate, getAllPublicPosts);
router.get("/:postId/detail", isAuthenticate, getPostDetail);

// user post
router.get("/followings", isAuthenticate, getAllFollowingPosts);
router.post(
  "/create",
  upload("image", 100000000).array("images", 10),
  createNewPost
);

router.put(
  "/:postId/update",
  isAuthenticate,
  upload("image", 100000000).array("files", 10),
  updateMyPost
);
router.delete("/:postId/delete", isAuthenticate, deleteMyPost);

// comment
router.post(
  "/:postId/comment/:commentId",
  isAuthenticate,
  createCommentOrReply
);

router.get("/:userId", isAuthenticate, getUserPosts);

module.exports = router;
