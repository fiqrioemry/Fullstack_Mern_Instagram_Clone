/* eslint-disable react/prop-types */
import { useState } from "react";
import PostContent from "./PostContent";
import PostContentControl from "./PostContentControl";

const PostComments = ({ comments }) => {
  const [showReplies, setShowReplies] = useState(true);

  return (
    <>
      {comments.map((comment, index) => (
        <div key={index}>
          <PostContent user={comment.User} content={comment.content} />
          <PostContentControl />
          {comment.Replies.length !== 0 && (
            <div>
              <div className="pl-11 py-2 text-xs">
                <button onClick={() => setShowReplies((prev) => !prev)}>
                  ----- {showReplies ? "Hide reply" : "Show reply"} (
                  {comment.Replies.length})
                </button>
              </div>
              {showReplies &&
                comment.Replies.map((reply, index) => (
                  <div className="pl-11 py-2" key={index}>
                    <PostContent user={reply.User} content={reply.content} />
                    <PostContentControl />
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default PostComments;
