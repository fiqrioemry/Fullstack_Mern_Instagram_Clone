import Avatar from "./Avatar.jsx";
import Replies from "./Replies.jsx";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Timestamp from "../Timestamp.jsx";
import { useCommentStore } from "@/store/useCommentStore.jsx";

const Comments = () => {
  const { replies, getReplies, setInput, comments, loadingReply } =
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
                <Link
                  to={`/${comment.username}`}
                  className="font-semibold text-sm"
                >
                  {comment.username}
                </Link>
                <span className="text-sm">{comment.content}</span>
              </div>
              <div className="text-xs space-x-2">
                <Timestamp createdAt={comment.createdAt} />
                {comment.likes > 0 && <span>{comment.likes} likes</span>}

                <button
                  onClick={() =>
                    setInput(
                      comment.postId,
                      comment.commentId,
                      comment.username
                    )
                  }
                  className="text-blue-500 text-xs"
                >
                  Reply
                </button>
              </div>

              {comment.replies > 0 && !replies[comment.commentId] && (
                <button
                  onClick={() => showReplies(comment.postId, comment.commentId)}
                  className="flex items-center text-xs space-x-2"
                >
                  <span> View replies ({comment.replies}) </span>
                  {loadingReply[comment.commentId] && (
                    <Loader size={18} className="animate-spin" />
                  )}
                </button>
              )}

              {replies[comment.commentId] && (
                <Replies replies={replies[comment.commentId]} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
