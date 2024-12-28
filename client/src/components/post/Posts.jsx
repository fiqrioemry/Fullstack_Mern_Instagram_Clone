import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";
import CarouselMediaPost from "./CarouselMediaPost";

const Posts = () => {
  const images = [
    "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_640.jpg",
    "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_640.jpg",
  ];
  return (
    <div className="w-full max-w-[30em] py-12 space-y-3">
      <div>
        {/* head post */}
        <div className="p-1 flex items-center justify-between">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Ellipsis />
        </div>
        <div className="border">
          <CarouselMediaPost images={images} />
        </div>
      </div>
    </div>
  );
};

export default Posts;
