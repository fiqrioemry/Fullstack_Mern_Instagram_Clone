/* eslint-disable react/prop-types */
import Content from "./Content";
import { useState } from "react";
import { Loader } from "lucide-react";
import LikeComment from "./LikeComment";
import Avatar from "@/components/ui/Avatar";
import LikeCount from "@/components/post/LikeCount";
import Timestamp from "@/components/post/Timestamp";
import ReplyButton from "@/components/post/ReplyButton";
import { useCommentStore } from "@/store/useCommentStore";

const Replies = ({ comment }) => {
  const [limit, setLimit] = useState(0);

  const { replies, getReplies, loading } = useCommentStore();

  const showReplies = () => {
    setLimit((prev) => prev + 3);
    getReplies(comment, limit + 3);
  };

  return (
    <div className="mt-2">
      {comment.replies > 0 && !replies[comment.commentId] && (
        <button
          onClick={() => showReplies(comment)}
          className="flex items-center text-xs space-x-2 text-muted-foreground"
        >
          <span> View replies ({comment.replies}) </span>
          {loading[comment.commentId] && (
            <Loader size={18} className="animate-spin" />
          )}
        </button>
      )}

      {comment.replies > 0 && replies[comment.commentId] && (
        <>
          {comment.replies <= limit ? (
            <button
              onClick={() => showReplies(comment)}
              className="flex items-center text-xs space-x-2 text-muted-foreground"
            >
              <span> View replies ({comment.replies - limit}) </span>
              {loading[comment.commentId] && (
                <Loader size={18} className="animate-spin" />
              )}
            </button>
          ) : (
            <button
              onClick={() => showReplies(comment, 0)}
              className="flex items-center text-xs space-x-2 text-muted-foreground"
            >
              <span> hide replies </span>
              {loading[comment.commentId] && (
                <Loader size={18} className="animate-spin" />
              )}
            </button>
          )}
        </>
      )}

      {replies[comment.commentId]?.map((reply) => (
        <div key={reply.replyId} className="py-1.5">
          <div className="flex space-x-3">
            <Avatar avatar={reply.avatar} />
            <div>
              <Content data={reply} />
              <div className="text-xs flex items-center space-x-2">
                <Timestamp data={reply} />
                <LikeCount data={reply} />
                <LikeComment data={reply} />
                <ReplyButton data={reply} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Replies;
