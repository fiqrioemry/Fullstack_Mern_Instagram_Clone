/* eslint-disable react/prop-types */
import Content from "./Content";
import { Loader } from "lucide-react";
import LikeComment from "./LikeComment";
import { useEffect, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import LikeCount from "@/components/post/LikeCount";
import Timestamp from "@/components/post/Timestamp";
import ReplyButton from "@/components/post/ReplyButton";
import { useCommentStore } from "@/store/useCommentStore";

const Replies = ({ comment }) => {
  const [limit, setLimit] = useState(0);

  const [showReply, setShowReply] = useState(false);

  const { replies, getReplies, loading } = useCommentStore();

  useEffect(() => {
    if (limit > 0) {
      getReplies(comment.postId, comment.commentId, limit);
    }
  }, [getReplies, comment, limit]);

  const handleHideReply = () => {
    setShowReply((prev) => !prev);
  };

  const handleShowReply = () => {
    setLimit((prev) => prev + 3);
    setShowReply(true);
  };

  useEffect(() => {
    // trigger when create a new reply while replies not shown yet, automatically show reply that has been made
    if (replies[comment.commentId] && showReply === false) {
      handleShowReply();
    }
  }, [replies[comment.commentId]]);

  return (
    <div className="mt-2">
      {comment.replies > 0 && !replies[comment.commentId] && (
        <button
          onClick={handleShowReply}
          className="flex items-center space-x-2 text-muted-foreground"
        >
          <span className="text-xs"> view replies ({comment.replies}) </span>
          {loading[comment.commentId] && (
            <Loader size={18} className="animate-spin" />
          )}
        </button>
      )}

      {comment.replies > 0 && replies[comment.commentId] && (
        <>
          {comment.replies > limit && showReply ? (
            <button
              onClick={handleShowReply}
              className="flex items-center space-x-2 text-muted-foreground"
            >
              <span className="text-xs">
                view replies ({comment.replies - limit})
              </span>
              {loading[comment.commentId] && (
                <Loader size={18} className="animate-spin" />
              )}
            </button>
          ) : (
            <button
              onClick={handleHideReply}
              className="flex items-center space-x-2 text-muted-foreground"
            >
              {showReply ? (
                <span className="text-xs"> hide replies </span>
              ) : (
                <span className="text-xs">
                  view replies ({comment.replies})
                </span>
              )}
              {loading[comment.commentId] && (
                <Loader size={18} className="animate-spin" />
              )}
            </button>
          )}
        </>
      )}

      {replies[comment.commentId] && showReply && (
        <>
          {replies[comment.commentId]?.map((reply) => (
            <div className="flex space-x-2 py-2" key={reply.replyId}>
              <Avatar avatar={reply.avatar} />
              <div className="flex-1">
                <Content data={reply} />
                <div className="text-xs flex items-center space-x-2">
                  <Timestamp data={reply} />
                  <LikeCount data={reply} />
                  <ReplyButton data={reply} />
                </div>
              </div>
              <LikeComment data={reply} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Replies;
