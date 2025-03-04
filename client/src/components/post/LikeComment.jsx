/* eslint-disable react/prop-types */
import { Heart } from "lucide-react";
import { useCommentStore } from "@/store/useCommentStore";

const LikeComment = ({ data }) => {
  const { likeComment } = useCommentStore();

  const handleLike = () => {
    likeComment(data.commentId, data.parentId);
  };

  return (
    <Heart
      size={14}
      aria-label="Like a comment"
      onClick={handleLike}
      className="btn-secondary text-xs"
      fill={data.isLiked ? "red" : "transparent"}
      stroke={data.isLiked ? "red" : "currentColor"}
    />
  );
};

export default LikeComment;
