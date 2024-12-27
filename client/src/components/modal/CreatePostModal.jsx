import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { useProvider } from "../../context/GlobalProvider";
import { useHandleForm } from "../../hooks/useHandleForm";
import { initialPostForm } from "../../config";
import { ArrowLeft } from "lucide-react";

const CreatePostModal = () => {
  const { openModal, handleCloseModal } = useProvider();
  const { formData, handleChange, handleMediaFile } =
    useHandleForm(initialPostForm);

  return (
    <Dialog
      open={openModal.create}
      onOpenChange={(isOpen) => (isOpen ? null : handleCloseModal("create"))}
    >
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex items-center justify-between py-3 px-3 border-b border-white">
          <ArrowLeft />
          <h5 className="font-semibold">Create New Post</h5>
          <button className="text-blue-500">Next</button>
        </div>
        <div className="flex h-[375px]">
          {/* Media Upload Area */}
          <div className="flex items-center justify-center w-[375px]">
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
                    type="fileInput"
                    id="file"
                    accept="image/*, video/*"
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
                      {media.type.startsWith("image") ? (
                        <div className="flex aspect-square">
                          <img
                            src={media.url}
                            alt={`Uploaded ${index + 1}`}
                            className="w-full h-full"
                          />
                        </div>
                      ) : media.type.startsWith("video") ? (
                        <video
                          src={media.url}
                          controls
                          className=" w-full h-full"
                        />
                      ) : null}
                    </CarouselItem>
                  ))}

                  {formData.images.map((path, index) => (
                    <CarouselItem key={index}>
                      <div className="flex aspect-square">
                        <img
                          src={path}
                          alt={`image_post`}
                          className="w-full h-full"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
