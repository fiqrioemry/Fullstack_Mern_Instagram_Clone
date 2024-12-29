import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PostContent = ({ data }) => {
  console.log(data);
  return (
    <div className="flex gap-x-3">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <div className="text-sm text-justify"></div>

      <div>
        <Ellipsis />
      </div>
    </div>
  );
};

export default PostContent;
