/* eslint-disable react/prop-types */
import { useState } from "react";
import PostContent from "./PostContent";
import data from "@/config/comments.json";
import PostContentControl from "./PostContentControl";

const PostComments = () => {
  const [showReplies, setShowReplies] = useState(true);

  const comments = data.comments;

  return (
    <>
      {comments.map((comment, index) => (
        <div key={index}>
          <PostContent username={comment.username} content={comment.content} />
          <PostContentControl />
          <div className="pl-11 py-2 text-xs">
            <button onClick={() => setShowReplies((prev) => !prev)}>
              ----- {showReplies ? "Hide reply" : "Show reply"} (3)
            </button>
          </div>

          {showReplies &&
            comment.replies.length > 0 &&
            comment.replies.map((reply, index) => (
              <div className="pl-11 py-2" key={index}>
                <PostContent
                  username={reply.username}
                  content={reply.content}
                />
                <PostContentControl />
              </div>
            ))}
        </div>
      ))}
    </>
  );
};

export default PostComments;
