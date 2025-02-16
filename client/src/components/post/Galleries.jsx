/* eslint-disable react/prop-types */
import {
  Carousel,
  CarouselNext,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "../ui/Image";

const Galleries = ({ images }) => {
  return (
    <Carousel>
      <CarouselContent className="flex items-center">
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="flex aspect-square">
              <Image url={image} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && <CarouselPrevious />}
      {images.length > 1 && <CarouselNext />}
    </Carousel>
  );
};

export default Galleries;
