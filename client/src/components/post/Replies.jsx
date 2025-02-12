/* eslint-disable react/prop-types */
import Avatar from "./Avatar";
import Timestamp from "../Timestamp";
import { Link } from "react-router-dom";

const Replies = ({ replies }) => {
  return (
    <div>
      {replies.map((reply) => (
        <div key={reply.replyId}>
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
                <span>{reply.likes} likes</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Replies;
