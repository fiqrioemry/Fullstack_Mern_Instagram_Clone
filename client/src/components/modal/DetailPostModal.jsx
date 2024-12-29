import PostHead from "../post/PostHead";
import PostControl from "../post/PostControl";
import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentForm from "../form/CommentForm";
import PostContainer from "../layout/PostContainer";
import CarouselMediaPost from "../post/CarouselMediaPost";
import { useProvider } from "../../context/GlobalProvider";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { initialCommentConfig, initialCommentForm } from "../../config";
import PostComments from "../post/PostComments";
import PostContent from "../post/PostContent";

const DetailPostModal = () => {
  const { openModal, handleCloseModal } = useProvider();
  const images = [
    "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_640.jpg",
    "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_640.jpg",
  ];

  return (
    <>
      <Dialog
        open={openModal.detail}
        onOpenChange={(isOpen) => (isOpen ? null : handleCloseModal("detail"))}
      >
        <DialogTitle>
          <DialogContent variant="detail">
            <PostContainer style="flex flex-row">
              <div className=" md:block hidden md:w-[45%]">
                <CarouselMediaPost images={images} />
              </div>

              <div className="w-full md:w-[55%]">
                <div className="border-b px-2 py-3 border-white">
                  <div className="flex gap-x-3">
                    <div>
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="text-sm text-justify">
                      <span>username </span>
                      <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laborum voluptatibus voluptates odit, est voluptatem
                        sapiente!
                      </span>
                    </div>

                    <div>
                      <Ellipsis />
                    </div>
                  </div>
                </div>

                <div className="h-[200px] px-2 py-3 space-y-3  overflow-y-scroll no-scrollbar">
                  <PostContent />
                  <PostComments />
                </div>
                <PostControl />
                <CommentForm
                  initialFormConfig={initialCommentConfig}
                  initialFormState={initialCommentForm}
                />
              </div>
            </PostContainer>
          </DialogContent>
        </DialogTitle>
      </Dialog>
    </>
  );
};

export default DetailPostModal;
