import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { CreateNewPost } from "@/components/modal/CreateNewPost";
import { Home, Compass, MessageCircle, Bell } from "lucide-react";

const nav_items = [
  { to: "/", icon: Home },
  { to: "/explore", icon: Compass },
  { to: "/notification", icon: Bell },
  { to: "/message", icon: MessageCircle },
];

const BottomNavbar = () => {
  const { user } = useAuthStore();

  return (
    <div className="bottom-navbar">
      {nav_items.map(({ to, icon: Icon }) => (
        <Link key={to} to={to} className="btn-nav flex justify-center">
          <Icon size={24} />
        </Link>
      ))}

      <CreateNewPost />

      <Link to={`/${user.username}`} className="btn-nav flex justify-center">
        <Avatar avatar={user.avatar} />
      </Link>
    </div>
  );
};

export default BottomNavbar;
