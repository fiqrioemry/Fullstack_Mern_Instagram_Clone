/* eslint-disable react/prop-types */
import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PostContent = ({ user, content = null }) => {
  return (
    <div className="flex justify-between px-2 py-4 ">
      <div className="flex space-x-3">
        <Avatar>
          <AvatarImage src={user.avatar} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-sm text-justify space-x-2">
          <span className="font-medium">{user.username} </span>
          {content && <span>{content}</span>}
        </div>
      </div>

      <div>
        <Ellipsis />
      </div>
    </div>
  );
};

export default PostContent;
