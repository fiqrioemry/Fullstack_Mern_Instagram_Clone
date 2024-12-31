const express = require("express");
const router = express.Router();

// controller
const {
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
} = require("../../controller/comment");
const isAuthenticate = require("../../middleware/isAuthenticate");
const { getReplies, createReply } = require("../../controller/reply");

router.put("/:commentId", isAuthenticate, updateComment);
router.delete("/:commentId", isAuthenticate, deleteComment);
router.post("/:commentId/like", isAuthenticate, likeComment);
router.delete("/:commentId/like", isAuthenticate, unlikeComment);
router.post("/:commentId/replies", isAuthenticate, createReply);
router.get("/:commentId/replies", isAuthenticate, getReplies);

module.exports = router;
