import { Link } from "react-router-dom";
import { CreateNewPost } from "@/components/modal/CreateNewPost";
import { Home, Compass, MessageCircle, Bell } from "lucide-react";
import ProfileMenu from "../sidebar/ProfileMenu";

const nav_items = [
  { to: "/", icon: Home },
  { to: "/explore", icon: Compass },
  { to: "/notification", icon: Bell },
  { to: "/message", icon: MessageCircle },
];

const BottomNavbar = () => {
  return (
    <div className="bottom-navbar">
      {nav_items.map(({ to, icon: Icon }) => (
        <Link key={to} to={to} className="btn-nav flex justify-center">
          <Icon size={24} />
        </Link>
      ))}

      <CreateNewPost />

      <ProfileMenu labelClass={"hidden"} />
    </div>
  );
};

export default BottomNavbar;
