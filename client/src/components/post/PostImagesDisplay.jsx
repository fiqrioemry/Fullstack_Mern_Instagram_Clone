/* eslint-disable react/prop-types */
import {
  Carousel,
  CarouselNext,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PostImagesDisplay = ({ images }) => {
  return (
    <Carousel>
      <CarouselContent className="flex items-center">
        {images.map((url, index) => (
          <CarouselItem key={index}>
            <div className="flex aspect-square">
              <img
                src={url}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-full"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && <CarouselPrevious />}
      {images.length > 1 && <CarouselNext />}
    </Carousel>
  );
};

export default PostImagesDisplay;
