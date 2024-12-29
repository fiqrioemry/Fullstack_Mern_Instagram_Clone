import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const PostHead = () => {
  return (
    <div className="p-1 flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>username</span>
      </div>
      <Ellipsis />
    </div>
  );
};

export default PostHead;
