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
      {comments.map((comment, index) =>
        console.log(comment)(
          <div key={index}>
            <PostContent data={comment} />
            <PostContentControl />
            <div className="pl-11 text-xs">
              <button onClick={() => setShowReplies((prev) => !prev)}>
                ----- {showReplies ? "hidden reply" : "show reply"} (3)
              </button>
            </div>

            {showReplies &&
              comment.replies.length > 0 &&
              comment.replies.map((reply, index) => (
                <div className="pl-11 py-3 space-y-3" key={index}>
                  <PostContent data={reply} />
                  <PostContentControl />
                </div>
              ))}
          </div>
        )
      )}
    </>
  );
};

export default PostComments;
