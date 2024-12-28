/* eslint-disable react/prop-types */
import {
  Carousel,
  CarouselNext,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselMediaPost = ({ formData }) => {
  return (
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
  );
};

export default CarouselMediaPost;
