"use client";

import { cn } from "@/lib/utils";
import UserAvatar from "./Avatar";
import { Link } from "react-router-dom";
import { useProvider } from "../context/GlobalProvider";
import { buttonVariants } from "@/components/ui/button";

function ProfileLink() {
  const { currentPath, userData } = useProvider();
  const path = `/${userData.username}`;
  const isActive = currentPath === path;

  return (
    <Link
      to={path}
      className={buttonVariants({
        variant: "nav",
        size: "lg",
      })}
    >
      <UserAvatar user={userData} />
      <div
        className={`${cn("hidden lg:block", {
          "font-bold": isActive,
        })}`}
      >
        Profile
      </div>
    </Link>
  );
}

export default ProfileLink;
