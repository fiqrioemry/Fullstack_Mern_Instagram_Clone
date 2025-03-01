/* eslint-disable react/prop-types */

import LikeCount from "./LikeCount";
import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import Timestamp from "@/components/ui/Timestamp";
import { useCommentStore } from "@/store/useCommentStore";

const Replies = ({ replies, formik, parentId }) => {
  const { likeReply } = useCommentStore();

  return (
    <div className="mt-2">
      {replies.map((reply) => (
        <div key={reply.replyId} className="py-1.5">
          <div className="flex space-x-3">
            <Avatar avatar={reply.avatar} />

            <div>
              <div className="space-x-1">
                <Link to={`/${reply.username}`} className="btn-secondary">
                  {reply.username}
                </Link>
                <span className="text-sm">{reply.content}</span>
              </div>

              <div className="text-xs flex items-center space-x-2">
                <Timestamp createdAt={reply.createdAt} />
                <LikeCount data={reply} />

                <LikeButton
                  data={reply}
                  onClick={likeReply}
                  id={reply.commentId}
                  parentId={parentId}
                />
                <ReplyButton form={formik} parentId={parentId} data={reply} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Replies;
