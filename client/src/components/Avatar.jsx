/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ user }) => {
  const initials = user.username
    .split(" ")
    .map((word) => word[0])
    .join("");
  return (
    <>
      <Avatar className="borderborder-muted-foreground/50 rounded-full">
        <AvatarImage src={user.avatar} alt="avatar" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </>
  );
};

export default UserAvatar;
