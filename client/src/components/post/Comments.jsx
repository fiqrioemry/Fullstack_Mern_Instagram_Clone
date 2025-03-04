/* eslint-disable react/prop-types */
import Replies from "./Replies.jsx";
import { Loader } from "lucide-react";
import LikeCount from "./LikeCount.jsx";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton.jsx";
import ReplyButton from "./ReplyButton.jsx";
import Avatar from "@/components/ui/Avatar.jsx";
import Timestamp from "@/components/ui/Timestamp.jsx";
import { useCommentStore } from "@/store/useCommentStore.jsx";
import CommentsLoading from "@/components/skeleton/CommentsLoading.jsx";

const Comments = ({ comments }) => {
  const { replies, getReplies, loading, likeComment } = useCommentStore();

  const showReplies = (comment) => {
    getReplies(comment);
  };

  if (!comments) return <CommentsLoading />;

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.commentId}>
          <div className="flex space-x-3">
            <Avatar avatar={comment.avatar} />
            <div>
              <div className="space-x-1">
                <Link to={`/${comment.username}`} className="btn-secondary">
                  {comment.username}
                </Link>
                <span className="text-sm">{comment.content}</span>
              </div>

              <div className="text-xs flex items-center gap-2">
                <Timestamp createdAt={comment.createdAt} />
                <LikeCount data={comment} />
                <LikeButton
                  data={comment}
                  onClick={likeComment}
                  id={comment.commentId}
                />

                <ReplyButton data={comment} />
              </div>

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

              {replies[comment.commentId] && (
                <Replies
                  parentId={comment.commentId}
                  replies={replies[comment.commentId]}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
