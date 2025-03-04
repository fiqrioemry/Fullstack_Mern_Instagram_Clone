/* eslint-disable react/prop-types */
import LikeCount from "./LikeCount";
import LikeButton from "./LikeButton";
import { formatDateToISO } from "@/lib/utils";
import { usePostStore } from "@/store/usePostStore";
import { Bookmark, MessageCircle } from "lucide-react";
import { useCommentStore } from "@/store/useCommentStore";

const PostControl = ({ post }) => {
  const { likePost } = usePostStore();
  const { setSelectedComment } = useCommentStore();

  const handleComment = () => {
    setSelectedComment(post);
  };

  return (
    <div className="space-y-1 py-2">
      {/* post control button */}
      <div className="flex items-center gap-4">
        <LikeButton size={24} data={post} id={post.postId} onClick={likePost} />
        <MessageCircle
          onClick={handleComment}
          className="btn-secondary"
          aria-label="Comment on Post"
        />
        <Bookmark className="btn-secondary" />
      </div>

      {/* likecount and date */}
      <div className="text-sm md:text-md">
        <LikeCount data={post} />
        {formatDateToISO(post.createdAt)}
      </div>
    </div>
  );
};

export default PostControl;
