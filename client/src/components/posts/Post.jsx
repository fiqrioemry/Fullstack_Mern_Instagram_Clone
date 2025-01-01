import Options from "./Options";
import Comments from "./Comments";
import Caption from "./Caption";
import Galleries from "./Galleries";

const Post = ({ post, comments }) => {
  return (
    <div className="border border-muted-foreground/25">
      <div className="grid grid-cols-10 ">
        <div className="col-span-6">
          <Galleries images={post.images} />
        </div>
        <div className="col-span-4">
          <Caption user={post} />
          <div className="overflow-y-scroll no-scrollbar">
            <Caption user={post} content={post.content} />
            <Comments comments={comments} />
          </div>
        </div>
        <Options />
      </div>
    </div>
  );
};

export default Post;
