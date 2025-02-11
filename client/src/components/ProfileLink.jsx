"use client";

import { cn } from "@/lib/utils";
// import UserAvatar from "./Avatar";
// import { Link } from "react-router-dom";
// import { useProvider } from "../context/GlobalProvider";
// import { buttonVariants } from "@/components/ui/button";

function ProfileLink() {
  // const { currentPath, userData, openSearch } = useProvider();
  // const path = `/${userData.username}`;
  // const isActive = currentPath === path;

  return (
    <div>TEST</div>
    // <Link
    //   to={path}
    //   className={buttonVariants({
    //     variant: "nav",
    //     size: "lg",
    //   })}
    // >
    //   <UserAvatar user={userData} />
    //   {!openSearch && (
    //     <div className={`${cn(isActive && "font-bold", "hidden lg:block")}`}>
    //       Profile
    //     </div>
    //   )}
    // </Link>
  );
}

export default ProfileLink;
