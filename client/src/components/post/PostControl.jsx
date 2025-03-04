/* eslint-disable react/prop-types */
import LikePost from "./LikePost";
import LikeCount from "./LikeCount";
import { Bookmark } from "lucide-react";
import CommentButton from "./CommentButton";
import { formatDateToISO } from "@/lib/utils";

const PostControl = ({ post }) => {
  return (
    <div className="space-y-1 py-2">
      {/* post control button */}
      <div className="flex items-center gap-4">
        <LikePost data={post} />
        <CommentButton data={post} />
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
