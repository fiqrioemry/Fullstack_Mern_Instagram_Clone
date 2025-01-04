const express = require("express");
const router = express.Router();
const isAuthenticate = require("../../middleware/isAuthenticate");
const {
  updateReply,
  deleteReply,
  likeReply,
  unlikeReply,
} = require("../../controller/reply");

router.put("/:replyId", isAuthenticate, updateReply);
router.delete("/:replyId", isAuthenticate, deleteReply);
router.post("/:replyId/like", isAuthenticate, likeReply);
router.delete("/:replyId/like", isAuthenticate, unlikeReply);

module.exports = router;
