import PostHead from "./PostHead";
import PostContent from "./PostContent";
import PostControl from "./PostControl";
import CommentForm from "../form/CommentForm";
import { Button } from "@/components/ui/button";
import PostContainer from "../layout/PostContainer";
import CarouselMediaPost from "./CarouselMediaPost";
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
        <PostContainer key={index}>
          <PostHead />
          <CarouselMediaPost images={images} />
          <div>
            <PostControl />
            <PostContent />
            <Button
              onClick={() => handleOpenModal("detail")}
              variant="none"
              size="none"
            >
              View all 1.275 comments
            </Button>
          </div>
          <CommentForm
            initialFormConfig={initialCommentConfig}
            initialFormState={initialCommentForm}
          />
        </PostContainer>
      ))}
    </div>
  );
};

export default Posts;
