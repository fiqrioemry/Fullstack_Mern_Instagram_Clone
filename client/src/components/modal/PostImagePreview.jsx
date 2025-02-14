/* eslint-disable react/prop-types */
import {
  Carousel,
  CarouselNext,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PostImagePreview = ({ images }) => {
  return (
    <Carousel>
      <CarouselContent className="flex items-center">
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="flex aspect-square">
              {image instanceof File || image instanceof Blob ? (
                <img
                  src={URL.createObjectURL(image)}
                  className="w-full h-full object-cover"
                  onLoad={(e) => {
                    if (e.target.src.startsWith("blob:")) {
                      URL.revokeObjectURL(e.target.src);
                    }
                  }}
                />
              ) : (
                <img
                  src={image}
                  alt={`image-${index}`}
                  className="object-cover"
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && <CarouselPrevious />}
      {images.length > 1 && <CarouselNext />}
    </Carousel>
  );
};

export default PostImagePreview;
