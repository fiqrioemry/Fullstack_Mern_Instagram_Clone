import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { useProvider } from "@/context/GlobalProvider";
import { Search, Home, Compass, MessageCircle, Bell } from "lucide-react";

const NavMenu = () => {
  const { user } = useAuthStore();
  const { handleSearch, openSearch, searchRef } = useProvider();

  return (
    <nav className="space-y-4">
      <Link
        to="/"
        className="inline-flex items-center hover:bg-gray-100 w-full rounded-md"
      >
        <div className="flex justify-center w-20 p-4">
          <Home size={24} />
        </div>
        <span
          className={cn(
            openSearch ? "opacity-0" : "opacity-100",
            " duration-300 transition-all ease-in"
          )}
        >
          Home
        </span>
      </Link>
      <button
        ref={searchRef}
        onClick={handleSearch}
        className="flex items-center hover:bg-gray-100 w-full rounded-md"
      >
        <div className="flex justify-center w-20 p-4">
          <Search size={24} />
        </div>
        <span
          className={cn(
            openSearch ? "opacity-0" : "opacity-100",
            " duration-300 transition-all ease-in"
          )}
        >
          Search
        </span>
      </button>
      <Link
        to="/explore"
        className="inline-flex items-center hover:bg-gray-100 w-full rounded-md"
      >
        <div className="flex  justify-center w-20 p-4">
          <Compass size={24} />
        </div>

        <span
          className={cn(
            openSearch ? "opacity-0" : "opacity-100",
            " duration-300 transition-all ease-in"
          )}
        >
          Explore
        </span>
      </Link>
      <Link
        to="/message"
        className="inline-flex items-center hover:bg-gray-100 w-full rounded-md"
      >
        <div className="flex justify-center w-20 p-4">
          <MessageCircle size={24} />
        </div>

        <span
          className={cn(
            openSearch ? "opacity-0" : "opacity-100",
            " duration-300 transition-all ease-in"
          )}
        >
          Message
        </span>
      </Link>
      <Link
        to="/notification"
        className="inline-flex items-center hover:bg-gray-100 w-full rounded-md"
      >
        <div className="flex items-center justify-center w-20 p-4">
          <Bell size={24} />
        </div>

        <span
          className={cn(
            openSearch ? "opacity-0" : "opacity-100",
            " duration-300 transition-all ease-in"
          )}
        >
          Notification
        </span>
      </Link>
      <Link
        to={`${user.username}`}
        className="inline-flex items-center hover:bg-gray-100 w-full rounded-md"
      >
        <div className="flex justify-center w-20 px-3 py-2">
          <Avatar avatar={user.avatar} />
        </div>
        <span
          className={cn(
            openSearch ? "opacity-0" : "opacity-100",
            " duration-300 transition-all ease-in"
          )}
        >
          Profile
        </span>
      </Link>
    </nav>
  );
};

export default NavMenu;
