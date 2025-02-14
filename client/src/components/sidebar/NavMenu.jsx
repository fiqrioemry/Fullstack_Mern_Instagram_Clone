import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { Search, Home, Compass, MessageCircle, Bell } from "lucide-react";

const NavMenu = () => {
  const { user } = useAuthStore();
  return (
    <nav>
      <Link
        to="/"
        className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 duration-300 space-x-3"
      >
        <Home size={24} />
        <span className="hidden lg:block">Home</span>
      </Link>
      <Link
        to="/"
        className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 duration-300 space-x-3"
      >
        <Search size={24} />
        <span className="hidden lg:block">search</span>
      </Link>
      <Link
        to="/"
        className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 duration-300 space-x-3"
      >
        <Compass size={24} />
        <span className="hidden lg:block">Explore</span>
      </Link>
      <Link
        to="/message"
        className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 duration-300 space-x-3"
      >
        <MessageCircle size={24} />
        <span className="hidden lg:block">Message</span>
      </Link>
      <Link
        to="/message"
        className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 duration-300 space-x-3"
      >
        <Bell size={24} />
        <span className="hidden lg:block">Notification</span>
      </Link>

      <Link
        to="/"
        className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 duration-300 space-x-3"
      >
        <Avatar avatar={user.avatar} />
        <span className="hidden lg:block">Profile</span>
      </Link>
    </nav>
  );
};

export default NavMenu;
