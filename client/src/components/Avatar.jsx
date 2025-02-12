/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils.js";

const UserAvatar = ({ user, width = 8, height = 8 }) => {
  const initials = user.username
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <>
      <Avatar className={cn(`h-${height} w-${width}`, "border rounded-full")}>
        <AvatarImage src={avatar} alt="avatar" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </>
  );
};

export default UserAvatar;
