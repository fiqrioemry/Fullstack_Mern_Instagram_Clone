/* eslint-disable react/prop-types */
import Content from "./Content";
import LikeComment from "./LikeComment";
import { Loader } from "lucide-react";
import Avatar from "@/components/ui/Avatar.jsx";
import Replies from "@/components/post/Replies.jsx";
import Timestamp from "@/components/post/Timestamp.jsx";
import LikeCount from "@/components/post/LikeCount.jsx";
import ReplyButton from "@/components/post/ReplyButton.jsx";
import { useCommentStore } from "@/store/useCommentStore.jsx";
import CommentsLoading from "@/components/skeleton/CommentsLoading.jsx";
import useScrollToView from "../../hooks/useScrollToView";

const Comments = ({ comments }) => {
  const { viewRef } = useScrollToView(comments);

  const { replies, getReplies, loading } = useCommentStore();

  const showReplies = (comment) => {
    getReplies(comment);
  };

  if (!comments) return <CommentsLoading />;

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.commentId} ref={viewRef}>
          <div className="flex space-x-3">
            <Avatar avatar={comment.avatar} />
            <div>
              <Content data={comment} />

              <div className="text-xs flex items-center gap-2">
                <Timestamp data={comment} />
                <LikeCount data={comment} />
                <LikeComment data={comment} />
                <ReplyButton data={comment} />
              </div>

              {comment.replies > 0 && !replies[comment.commentId] && (
                <button
                  onClick={() => showReplies(comment)}
                  className="flex items-center text-xs space-x-2 text-muted-foreground"
                >
                  <span> View replies ({comment.replies}) </span>
                  {loading[comment.commentId] && (
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
