import PostContent from "./PostContent";
import PostControl from "./PostControl";
import CommentForm from "../form/CommentForm";
import { Button } from "@/components/ui/button";
import PostImagesDisplay from "./PostImagesDisplay";
import { useProvider } from "../../context/GlobalProvider";
import { initialCommentConfig, initialCommentForm } from "../../config";

const Posts = () => {
  const { handleOpenModal } = useProvider();
  const images = [
    "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_640.jpg",
    "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_640.jpg",
  ];

  return (
    <div className="w-full max-w-[30em] py-12 space-y-3">
      {[...Array(20)].map((__, index) => (
        <div className="border-b" key={index}>
          <PostContent />
          <PostImagesDisplay images={images} />
          <PostControl />
          <Button onClick={() => handleOpenModal("detail")}>
            View all 1.275 comments
          </Button>
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
