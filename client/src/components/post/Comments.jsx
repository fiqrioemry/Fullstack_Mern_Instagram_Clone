/* eslint-disable react/prop-types */
import Replies from "./Replies.jsx";
import { Link } from "react-router-dom";
import { Loader, Heart } from "lucide-react";
import Avatar from "@/components/ui/Avatar.jsx";
import Timestamp from "@/components/ui/Timestamp.jsx";
import { useCommentStore } from "@/store/useCommentStore.jsx";

const Comments = ({ formik }) => {
  const { replies, getReplies, comments, loadingReply, likeComment } =
    useCommentStore();

  const showReplies = (postId, commentId) => {
    getReplies(postId, commentId);
  };

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

              <div className="text-xs flex items-center space-x-2 text-muted-foreground">
                <Timestamp createdAt={comment.createdAt} />
                {comment.likes > 0 && <span>{comment.likes} likes</span>}

                <button
                  className="flex items-center space-x-1 "
                  onClick={() => likeComment(comment.commentId)}
                >
                  <Heart
                    className={`w-4 h-4 cursor-pointer transition ${
                      comment.isLiked
                        ? "text-red-500 fill-red-500"
                        : "text-muted-foreground hover:text-muted-foreground/60"
                    }`}
                  />
                </button>

                {/* Tombol Reply */}
                <button
                  className="text-xs btn-secondary"
                  onClick={() => {
                    formik.setFieldValue("postId", comment.postId);
                    formik.setFieldValue("parentId", comment.commentId);
                    formik.setFieldValue("content", `@${comment.username} `);
                  }}
                >
                  Reply
                </button>
              </div>

              {comment.replies > 0 && !replies[comment.commentId] && (
                <button
                  onClick={() =>
                    showReplies(
                      comment.postId,
                      comment.commentId,
                      comment.username
                    )
                  }
                  className="flex items-center text-xs space-x-2 text-muted-foreground"
                >
                  <span> View replies ({comment.replies}) </span>
                  {loadingReply[comment.commentId] && (
                    <Loader size={18} className="animate-spin" />
                  )}
                </button>
              )}

              {replies[comment.commentId] && (
                <Replies
                  formik={formik}
                  parentId={comment.commentId}
                  replies={replies[comment.commentId].replies}
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
