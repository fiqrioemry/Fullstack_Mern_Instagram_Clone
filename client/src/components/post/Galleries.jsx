/* eslint-disable react/prop-types */
import {
  Carousel,
  CarouselNext,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "@/components/ui/Image";

const Galleries = ({ images }) => {
  return (
    <Carousel className="max-h-80 flex-center overflow-hidden">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image url={image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && <CarouselPrevious />}
      {images.length > 1 && <CarouselNext />}
    </Carousel>
  );
};

export default Galleries;
