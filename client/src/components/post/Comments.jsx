/* eslint-disable react/prop-types */
import Avatar from "./Avatar.jsx";
import Replies from "./Replies.jsx";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Timestamp from "../Timestamp.jsx";
import { useRepliestore } from "@/store/useRepliesStore.jsx.jsx";

const Comments = ({ comments }) => {
  const { replies, getReplies, loading } = useRepliestore();

  const showReplies = (postId, commentId) => {
    getReplies(postId, commentId);
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id}>
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
                <span>{comment.likes} likes</span>
              </div>

              {comment.replies > 0 && replies.length === 0 && (
                <button
                  onClick={() => showReplies(comment.id, comment.commentId)}
                  className="flex items-center text-xs space-x-2"
                >
                  <span> View replies ({comment.replies}) </span>
                  <span>
                    {loading ? (
                      <Loader size={18} className="animate-spin" />
                    ) : null}
                  </span>
                </button>
              )}
              {replies.length !== 0 && <Replies replies={replies} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
