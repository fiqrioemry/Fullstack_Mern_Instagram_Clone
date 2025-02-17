/* eslint-disable react/prop-types */
import { Heart } from "lucide-react";
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
                {reply.likes > 0 && <span>{reply.likes} likes</span>}

                <button
                  className="flex items-center space-x-1"
                  onClick={() => likeReply(reply.commentId, parentId)}
                >
                  <Heart
                    className={`w-4 h-4 cursor-pointer transition ${
                      reply.isLiked
                        ? "text-red-500 fill-red-500"
                        : "text-muted-foreground hover:text-muted-foreground/60"
                    }`}
                  />
                </button>

                <button
                  className="text-xs btn-secondary"
                  onClick={() => {
                    formik.setFieldValue("postId", reply.postId);
                    formik.setFieldValue("parentId", parentId);
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
