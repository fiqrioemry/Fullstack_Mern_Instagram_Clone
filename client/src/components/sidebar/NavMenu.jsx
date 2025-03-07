import {
  Home,
  Bell,
  Search,
  Compass,
  SquarePlus,
  MessageCircle,
} from "lucide-react";
import NavItem from "./NavItem";
import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { forwardRef, useEffect, useState } from "react";
import { CreateNewPost } from "@/components/modal/CreateNewPost";

// eslint-disable-next-line react/display-name, react/prop-types
const NavMenu = forwardRef(({ openSearch, handleSearch }, ref) => {
  const location = useLocation();
  const { user } = useAuthStore();
  const [openCreate, setOpenCreate] = useState(false);
  const { notifications, getNotifications } = useUserStore();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const handleCreatePost = () => {
    setOpenCreate((prev) => !prev);
  };

  const labelClass = cn(
    openSearch || location.pathname.includes("message")
      ? "opacity-0"
      : "opacity-100",
    "duration-300 transition-all ease-in hidden lg:block"
  );

  return (
    <div className="space-y-4">
      <NavItem
        to="/"
        label="Home"
        labelClass={labelClass}
        icon={<Home size={24} />}
      />
      <NavItem
        ref={ref}
        label="Search"
        labelClass={labelClass}
        onClick={handleSearch}
        icon={<Search size={24} />}
      />
      <NavItem
        to="/explore"
        label="Explore"
        labelClass={labelClass}
        icon={<Compass size={24} />}
      />
      <NavItem
        to="/message"
        label="Message"
        labelClass={labelClass}
        icon={<MessageCircle size={24} />}
      />
      <NavItem
        to="/notification"
        label="Notification"
        notifications={notifications}
        labelClass={labelClass}
        icon={<Bell size={24} />}
      />
      <NavItem
        label="Create"
        labelClass={labelClass}
        onClick={handleCreatePost}
        icon={<SquarePlus size={24} />}
      />
      <NavItem
        label="Profile"
        to={`/${user.username}`}
        labelClass={labelClass}
        icon={<Avatar data={user} />}
      />

      <CreateNewPost isOpen={openCreate} setIsOpen={setOpenCreate} />
    </div>
  );
});

export default NavMenu;
