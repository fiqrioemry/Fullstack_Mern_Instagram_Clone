import { Dialog, DialogContent } from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { useProvider } from "../../context/GlobalProvider";
import { useHandleForm } from "../../hooks/useHandleForm";
import { initialPostForm } from "../../config";

const CreatePostModal = () => {
  const { openModal, handleCloseModal, handleOpenModal } = useProvider();
  const { formData, handleMediaFile } = useHandleForm(initialPostForm);

  const handleCancelPost = () => {
    handleOpenModal("discard");
  };

  return (
    <Dialog
      open={openModal.create}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          if (!formData.images.length) {
            handleCloseModal("create");
          } else {
            handleCancelPost();
          }
        }
      }}
    >
      <DialogContent className="sm:min-w-[425px] bg-accent">
        <div className="flex items-center justify-center py-3  border-b">
          <h5 className="font-semibold">Create New Post</h5>
          {formData.images.length !== 0 && (
            <button className="text-blue-500">Next</button>
          )}
        </div>
        <div className="flex h-[375px]">
          {/* Media Upload Area */}
          <div className="flex items-center justify-center w-[300px] md:w-[350px]">
            {formData.images.length === 0 ? (
              <div className="text-center space-y-3">
                <h5>Drag & drop media here</h5>
                <div>
                  <label
                    htmlFor="file"
                    className=" bg-blue-500 p-2 rounded-md cursor-pointer"
                  >
                    Select From Computer
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleMediaFile}
                  />
                </div>
              </div>
            ) : (
              <Carousel>
                <CarouselContent className="flex items-center">
                  {formData.images.map((media, index) => (
                    <CarouselItem key={index}>
                      <div className="flex aspect-square">
                        <img
                          src={media.url}
                          alt={`Uploaded ${index + 1}`}
                          className="w-full h-full"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {formData.images.length > 1 && <CarouselPrevious />}
                {formData.images.length > 1 && <CarouselNext />}
              </Carousel>
            )}
          </div>

          <div className="flex h-[375px] w-[375px] bg-red-500"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
