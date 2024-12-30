/* eslint-disable react/prop-types */
import PostContent from "./PostContent";
import PostControl from "./PostControl";
import CommentForm from "../form/CommentForm";
import { Button } from "@/components/ui/button";
import PostImagesDisplay from "./PostImagesDisplay";
import { useProvider } from "../../context/GlobalProvider";
import { initialCommentConfig, initialCommentForm } from "../../config";

const Posts = ({ posts, message, recommend }) => {
  const { handleOpenModal } = useProvider();

  return (
    <div className="w-full max-w-[30em] py-12 space-y-3">
      {posts.length === 0 ? (
        <div className="h-60 w-full flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">{message}</h1>
          <div className="py-6 space-y-6">
            {recommend.map((user, index) => (
              <div key={index}>{user.username}</div>
            ))}
          </div>
        </div>
      ) : (
        posts.map((post, index) => (
          <div className="border-b" key={index}>
            <PostContent />
            <PostImagesDisplay images={post.images} />
            <PostControl />
            <Button onClick={() => handleOpenModal("detail")}>
              View all 1.275 comments
            </Button>
            <CommentForm
              initialFormConfig={initialCommentConfig}
              initialFormState={initialCommentForm}
            />
          </div>
        ))
      )}
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
