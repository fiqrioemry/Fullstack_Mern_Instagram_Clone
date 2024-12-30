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
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="flex aspect-square">
              <img
                src={image.image}
                alt="post_image"
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
