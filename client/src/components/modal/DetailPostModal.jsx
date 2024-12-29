import PostContent from "../post/PostContent";
import PostControl from "../post/PostControl";
import CommentForm from "../form/CommentForm";
import PostComments from "../post/PostComments";
import PostImagesDisplay from "../post/PostImagesDisplay";
import { useProvider } from "../../context/GlobalProvider";
import { initialCommentConfig, initialCommentForm } from "../../config";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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
            <div className="flex flex-row">
              <div className=" md:block hidden md:w-[45%]">
                <PostImagesDisplay images={images} />
              </div>

              <div className="w-full md:w-[55%] flex flex-col justify-between">
                <div>
                  <div className="border-b border-muted-foreground/25">
                    <PostContent />
                  </div>
                  <div className="h-[180px] space-y-3 overflow-y-scroll no-scrollbar">
                    <PostContent />
                    <PostComments />
                  </div>
                </div>

                <div className="px-2">
                  <PostControl />
                  <CommentForm
                    initialFormConfig={initialCommentConfig}
                    initialFormState={initialCommentForm}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogTitle>
      </Dialog>
    </>
  );
};

export default DetailPostModal;
