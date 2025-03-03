/* eslint-disable react/prop-types */
import { Heart } from "lucide-react";
import { useCommentStore } from "@/store/useCommentStore";

const LikeButton = ({ data, size = 14 }) => {
  const { likeComment } = useCommentStore();

  const handleLike = () => {
    likeComment(data.commentId, data.parentId);
  };

  return (
    <Heart
      size={size}
      aria-label="Like Post"
      onClick={handleLike}
      className="btn-secondary text-xs"
      fill={data.isLiked ? "red" : "transparent"}
      stroke={data.isLiked ? "red" : "currentColor"}
    />
  );
};

export default LikeButton;
