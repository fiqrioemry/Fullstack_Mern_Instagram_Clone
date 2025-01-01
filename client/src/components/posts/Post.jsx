/* eslint-disable react/prop-types */
import Caption from "./Caption";
import Comments from "./Comments";
import Galleries from "./Galleries";
import Timestamp from "../Timestamp";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

const Post = ({ post, comments }) => {
  return (
    <div className="border border-muted-foreground/25">
      <div className="grid grid-cols-10 ">
        <div className="col-span-6">
          <Galleries images={post.images} />
        </div>
        <div className="col-span-4 ">
          {/* user avatar */}
          <div className="py-2 px-2 border-b border-muted-foreground/25">
            <Caption user={post} />
          </div>

          {/* comment section */}
          <div className="py-2 px-2 border-b border-muted-foreground/25">
            <div className="h-[325px] overflow-y-scroll no-scrollbar">
              <Caption user={post} content={post.content} />
              <Comments comments={comments} />
            </div>
          </div>

          {/* comment control */}
          <div className="py-2 px-2 border-b border-muted-foreground/25">
            <div className="h-[70px] space-y-2">
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

          {/* comment form */}
          <div className="py-2 px-2 ">
            <form>
              <div className="flex items-center">
                <textarea
                  placeholder="Add a comment ..."
                  className="w-full flex items-center text-sm bg-background resize-none  focus:outline-none overflow-y-scroll no-scrollbar"
                />
                <button>Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
