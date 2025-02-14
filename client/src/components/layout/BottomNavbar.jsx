import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { CreateNewPost } from "@/components/create_post/CreateNewPost";
import { Search, Home, Compass, MessageCircle, Bell } from "lucide-react";

const BottomNavbar = () => {
  const { user } = useAuthStore();
  return (
    <div className="fixed md:hidden bottom-0 left-0 right-0 py-2 px-4 bg-background border-t">
      <nav className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center p-4 rounded-lg hover:bg-gray-100 duration-300 space-x-3"
        >
          <Home size={24} />
          <span className="hidden lg:block">Home</span>
        </Link>
        <Link
          to="/"
          className="hidden md:flex items-center p-4 rounded-lg hover:bg-gray-100 duration-300 space-x-3"
        >
          <Search size={24} />
          <span className="hidden lg:block">search</span>
        </Link>
        <Link
          to="/"
          className="flex items-center p-4 rounded-lg hover:bg-gray-100 duration-300 space-x-3"
        >
          <Compass size={24} />
          <span className="hidden lg:block">Explore</span>
        </Link>
        <Link
          to="/message"
          className="flex items-center p-4 rounded-lg hover:bg-gray-100 duration-300 space-x-3"
        >
          <MessageCircle size={24} />
          <span className="hidden lg:block">Messages</span>
        </Link>
        <Link
          to="/notification"
          className="flex items-center p-4 rounded-lg hover:bg-gray-100 duration-300 space-x-3"
        >
          <Bell size={24} />
          <span className="hidden lg:block">Notification</span>
        </Link>

        <CreateNewPost />
        <Link
          to={`/${user.username}`}
          className="flex items-center p-2 rounded-lg hover:bg-gray-100 duration-300 space-x-3"
        >
          <Avatar avatar={user.avatar} />
          <span className="hidden lg:block">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default BottomNavbar;
