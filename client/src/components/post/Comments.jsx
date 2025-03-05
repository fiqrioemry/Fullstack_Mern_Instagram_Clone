/* eslint-disable react/prop-types */
import Content from "./Content";
import LikeComment from "./LikeComment";
import Avatar from "@/components/ui/Avatar.jsx";
import Replies from "@/components/post/Replies.jsx";
import useScrollToView from "@/hooks/useScrollToView";
import Timestamp from "@/components/post/Timestamp.jsx";
import LikeCount from "@/components/post/LikeCount.jsx";
import ReplyButton from "@/components/post/ReplyButton.jsx";
import CommentsLoading from "@/components/skeleton/CommentsLoading.jsx";

const Comments = ({ comments }) => {
  const { viewRef } = useScrollToView(comments);

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

              <Replies comment={comment} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
