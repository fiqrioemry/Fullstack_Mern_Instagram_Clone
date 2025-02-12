/* eslint-disable react/prop-types */
import Timestamp from "./Timestamp";
import { Link } from "react-router-dom";

const Comments = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="flex space-x-3">
            <img
              src={comment.avatar}
              alt="User Avatar"
              className="w-9 h-9 rounded-full flex-shrink-0 border"
            />

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
              {/* Tombol "View Replies" */}
              {comment.replies > 0 && (
                <button className="text-xs">
                  View replies ({comment.replies})
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
