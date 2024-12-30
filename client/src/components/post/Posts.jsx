/* eslint-disable react/prop-types */
import PostContent from "./PostContent";
import PostControl from "./PostControl";
import CommentForm from "../form/CommentForm";
import { Button } from "@/components/ui/button";
import PostImagesDisplay from "./PostImagesDisplay";
import { useProvider } from "../../context/GlobalProvider";
import { initialCommentConfig, initialCommentForm } from "../../config";

const Posts = ({ posts }) => {
  const { handleOpenModal } = useProvider();

  return (
    <div>
      {posts.map((post, index) => (
        <div className="border-b" key={index}>
          <PostContent user={post.User} />
          <PostImagesDisplay images={post.PostGalleries} />
          <PostControl />
          {post.commentCount !== 0 && (
            <Button onClick={() => handleOpenModal("detail")}>
              View all {post.commentCount} comments
            </Button>
          )}

          <CommentForm
            initialFormConfig={initialCommentConfig}
            initialFormState={initialCommentForm}
          />
        </div>
      ))}
    </div>
  );
};

export default Posts;

// {[...Array(20)].map((__, index) => (
//   <div className="border-b" key={index}>
//     <PostContent />
//     <PostImagesDisplay images={images} />
//     <PostControl />
//     <Button onClick={() => handleOpenModal("detail")}>
//       View all 1.275 comments
//     </Button>
//     <CommentForm
//       initialFormConfig={initialCommentConfig}
//       initialFormState={initialCommentForm}
//     />
//   </div>
// ))}
