/* eslint-disable react/prop-types */

import Comments from "./Comments";
import Caption from "./Caption";
import Galleries from "./Galleries";
import CommentForm from "../form/CommentForm";
import { initialCommentConfig, initialCommentForm } from "../../config";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import Timestamp from "../Timestamp";
import { Button } from "@/components/ui/button";

const Post = ({ post, comments }) => {
  return (
    <div className="border border-muted-foreground/25">
      <div className="grid grid-cols-10 ">
        <div className="col-span-6">
          <Galleries images={post.images} />
        </div>
        <div className="col-span-4 ">
          {/* user avatar */}
          <div className="py-4 px-2 border-b border-muted-foreground/25">
            <Caption user={post} />
          </div>

          {/* comment section */}
          <div className="px-2 py-2 border-b border-muted-foreground/25">
            <div className="h-[325px] overflow-y-scroll no-scrollbar">
              <Caption user={post} content={post.content} />
              <Comments comments={comments} />
            </div>
          </div>

          {/* comment control */}
          <div className="py-2 px-2 border-b border-muted-foreground/25">
            <div className="space-y-2">
              <div className="flex gap-x-4">
                <Heart />
                <MessageCircle />
                <Bookmark />
              </div>
              <div className="text-sm">
                {post.likeCount !== 0 && (
                  <button>{post.likeCount} Likes</button>
                )}
              </div>
              <Timestamp createdAt={post.createdAt} />
            </div>
          </div>
          <CommentForm
            initialFormConfig={initialCommentConfig}
            initialFormState={initialCommentForm}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
