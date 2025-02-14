/* eslint-disable react/prop-types */
import Avatar from "./Avatar";
import Timestamp from "../Timestamp";
import { Link } from "react-router-dom";

const Replies = ({ replies, formik }) => {
  return (
    <div className="mt-2">
      {replies.map((reply) => (
        <div key={reply.replyId} className="py-1.5">
          <div className="flex space-x-3">
            <Avatar avatar={reply.avatar} />

            <div>
              <div className="space-x-1">
                <Link
                  to={`/${reply.username}`}
                  className="font-semibold text-sm"
                >
                  {reply.username}
                </Link>
                <span className="text-sm">{reply.content}</span>
              </div>
              <div className="text-xs space-x-2">
                <Timestamp createdAt={reply.createdAt} />

                <button
                  className="text-xs text-blue-500"
                  onClick={() => {
                    formik.setFieldValue("postId", reply.postId);
                    formik.setFieldValue("parentId", reply.commentId);
                    formik.setFieldValue("content", `@${reply.username} `);
                  }}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Replies;
