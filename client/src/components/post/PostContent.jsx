import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PostContent = ({ username, content }) => {
  return (
    <div className="flex justify-between px-2 py-4 ">
      <div className="flex space-x-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-sm text-justify space-x-2">
          <span className="font-medium">{username || "Johndoe55"} </span>
          <span>{content}</span>
        </div>
      </div>

      <div>
        <Ellipsis />
      </div>
    </div>
  );
};

export default PostContent;
