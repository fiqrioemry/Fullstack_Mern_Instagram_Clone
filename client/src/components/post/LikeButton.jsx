/* eslint-disable react/prop-types */
import { Heart } from "lucide-react";

const LikeButton = ({ onClick, data, id, parentId = null, size = 14 }) => {
  const handleLike = () => {
    onClick(id, parentId);
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
