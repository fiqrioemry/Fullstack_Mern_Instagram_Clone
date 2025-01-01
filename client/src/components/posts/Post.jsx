/* eslint-disable react/prop-types */
import Author from "../Author";
import Caption from "./Caption";
import Comments from "./Comments";
import Galleries from "./Galleries";
import PostControl from "../PostControl";
import CommentForm from "./CommentForm";

const Post = ({ post, comments }) => {
  return (
    <div className="content_margin border p-0">
      <div className="grid grid-cols-10 ">
        <div className="col-span-6">
          <Galleries images={post.images} />
        </div>
        <div className="col-span-4 ">
          {/* user avatar */}
          <div className="content_margin">
            <Author user={post} />
          </div>
          {/* comment section */}
          <div className="content_margin h-[325px] overflow-y-scroll no-scrollbar">
            <Caption user={post} content={post.content} />
            <Comments comments={comments} />
          </div>
          {/* comment control */}
          <div className="content_margin h-[90px] ">
            <PostControl post={post} />
          </div>

          {/* comment form */}
          <div className="content_margin border-none">
            <CommentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
