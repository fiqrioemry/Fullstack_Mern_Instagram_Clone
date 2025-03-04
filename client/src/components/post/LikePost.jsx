/* eslint-disable react/prop-types */
import { Heart } from "lucide-react";

import { usePostStore } from "@/store/usePostStore";

const LikePost = ({ data }) => {
  const { likePost } = usePostStore();

  const handleLike = () => {
    likePost(data.postId);
  };

  return (
    <Heart
      size={24}
      aria-label="Like Post"
      onClick={handleLike}
      className="btn-secondary text-xs"
      fill={data.isLiked ? "red" : "transparent"}
      stroke={data.isLiked ? "red" : "currentColor"}
    />
  );
};

export default LikePost;
