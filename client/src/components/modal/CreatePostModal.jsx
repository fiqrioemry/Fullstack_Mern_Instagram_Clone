import { useState } from "react";
import { initialPostForm } from "../../config";
import { Button } from "@/components/ui/button";
import DiscardPostModal from "./DiscardPostModal";
import PostImageForm from "../form/PostImageForm";
import CarouselMediaPost from "../post/CarouselMediaPost";
import { useHandleForm } from "../../hooks/useHandleForm";
import { useProvider } from "../../context/GlobalProvider";
import { ArrowLeft, ArrowRight, SquarePlus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CreatePostModal = () => {
  const [nextInput, setNextInput] = useState(false);
  const { formData, setFormData, handleChange } =
    useHandleForm(initialPostForm);
  const { openModal, handleCloseModal, handleOpenModal, handleCloseAllModals } =
    useProvider();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDiscardChanges = () => {
    setNextInput(false);
    handleCloseAllModals();
    setFormData(initialPostForm);
  };

  const toggleNextInput = () => setNextInput((prev) => !prev);

  const handleClosePost = (isOpen) => {
    if (!isOpen) {
      formData.images.length
        ? handleOpenModal("discard")
        : handleCloseModal("create");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleDiscardChanges();
  };

  return (
    <>
      <Dialog open={openModal.create} onOpenChange={handleClosePost}>
        <DialogTitle>
          <DialogContent
            variant="create"
            className={`${nextInput ? "md:max-w-[48rem]" : ""} `}
          >
            <div className="flex items-center justify-between py-3 px-3 border-b border-muted-foreground">
              {nextInput === true && (
                <ArrowLeft
                  className="cursor-pointer"
                  onClick={toggleNextInput}
                />
              )}
              <h5 className="font-semibold">New Post</h5>
              {formData.images.length !== 0 && nextInput === false && (
                <ArrowRight
                  className="cursor-pointer"
                  onClick={toggleNextInput}
                />
              )}
            </div>

            <form onSubmit={handleSubmit} className="block md:flex h-[375px]">
              <div
                className={`${
                  nextInput ? "w-1/2" : "w-full"
                } flex items-center justify-center `}
                onDrop={handleChange}
                onDragOver={handleDragOver}
              >
                {formData.images.length === 0 ? (
                  <PostImageForm
                    title={"Drag & drop media here"}
                    label={"Select from computer"}
                    style={
                      "bg-custom px-2 py-2 text-secondary rounded-md cursor-pointer"
                    }
                    handleChange={handleChange}
                  />
                ) : (
                  <div className="h-full w-full">
                    <CarouselMediaPost images={formData.preview} />
                  </div>
                )}

                {formData.images.length > 0 && nextInput === false && (
                  <PostImageForm
                    label={<SquarePlus size={20} />}
                    style="absolute bottom-5 right-5 bg-blue-500  p-2 rounded-full cursor-pointer"
                    handleChange={handleChange}
                  />
                )}
              </div>

              <div className={`${nextInput ? "w-1/2" : "w-0"}`}>
                <div className="px-3 space-y-2">
                  <div className="grid grid-cols-12 gap-x-[2px] p-2 border-b items-center text-sm">
                    <Avatar className="col-span-2">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="col-span-9 ">username</div>
                  </div>

                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your caption here..."
                    maxLength={1000}
                    className="w-full h-[225px] bg-accent resize-none overflow-y-scroll rounded-md p-2 focus:outline-none"
                  />

                  <div className="text-sm text-end px-2">
                    <span>{formData.content.length}</span>/ 1000 characters
                  </div>
                  <Button variant="custom" size="md" type="submit">
                    Create Post
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </DialogTitle>
      </Dialog>
      <DiscardPostModal handleDiscardChanges={handleDiscardChanges} />
    </>
  );
};

export default CreatePostModal;
