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
const { likePost, unlikePost } = require("../../controller/like");
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

router.get("/", isAuthenticate, getAllPublicPosts);
router.get("/:postId", isAuthenticate, getPostDetail);
router.get("/following", isAuthenticate, getAllFollowingPosts);

router.post("/", isAuthenticate, createNewPost);
router.put("/:postId", isAuthenticate, updateMyPost);
router.delete("/:postId", isAuthenticate, deleteMyPost);

// like & unlike a post
router.post("/:postId/like", isAuthenticate, likePost);
router.delete("/api/posts/:postId/like", isAuthenticate, unlikePost);

// comment a post
router.post("/api/posts/:postId/comments", isAuthenticate); // Create a comment on a post
router.get("/api/posts/:postId/comments", isAuthenticate);

module.exports = router;
