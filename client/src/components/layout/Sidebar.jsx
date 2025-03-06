import {
  Home,
  Menu,
  Bell,
  Search,
  Compass,
  SquarePlus,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import NavItem from "@/components/sidebar/NavItem";
import { useAuthStore } from "@/store/useAuthStore";
import useOpenSlidePanel from "@/hooks/useOpenSlidePanel";
import useOpenMoreOptions from "@/hooks/useOpenMoreOptions";
import MoreOptions from "@//components/sidebar/MoreOptions";
import { CreateNewPost } from "@/components/modal/CreateNewPost";

import SearchPanel from "@/components/sidebar/SearchPanel";
import AvatarIcon from "@/components/sidebar/AvatarIcon";

export default function Sidebar() {
  const { user } = useAuthStore();
  const [openCreate, setOpenCreate] = useState(false);
  const { handleOpenPanel, openPanel, panelRef } = useOpenSlidePanel();
  const { moreRef, openMore, setOpenMore, toggleTheme, setToggleTheme } =
    useOpenMoreOptions();

  const handleOpenCreate = () => {
    setOpenCreate((prev) => !prev);
  };

  const handleOpenMore = () => {
    setOpenMore((prev) => !prev);
  };

  const labelClass = cn(
    openPanel ? "opacity-0" : "opacity-100",
    "duration-300 transition-all ease-in hidden lg:block"
  );

  return (
    <aside className="flex h-screen relative w-72">
      <SearchPanel
        panelRef={panelRef}
        openPanel={openPanel}
        handleOpen={handleOpenPanel}
      />
      <CreateNewPost isOpen={openCreate} setIsOpen={setOpenCreate} />
      <nav
        className={cn(
          openPanel ? "w-20" : "w-20 lg:w-full",
          "side-navbar space-y-4"
        )}
      >
        <NavItem
          to="/"
          label="Home"
          labelClass={labelClass}
          icon={<Home size={24} />}
        />
        <NavItem
          ref={panelRef}
          label="Search"
          labelClass={labelClass}
          onClick={handleOpenPanel}
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
          labelClass={labelClass}
          icon={<Bell size={24} />}
        />
        <NavItem
          label="Create"
          labelClass={labelClass}
          onClick={handleOpenCreate}
          icon={<SquarePlus size={24} />}
        />
        <NavItem
          label="Profile"
          to={`/${user.username}`}
          labelClass={labelClass}
          icon={<AvatarIcon />}
        />
        <NavItem
          label="More"
          labelClass={labelClass}
          onClick={handleOpenMore}
          icon={<Menu size={24} />}
        />
        <MoreOptions
          open={openMore}
          moreRef={moreRef}
          toggleTheme={toggleTheme}
          setToggleTheme={setToggleTheme}
        />
      </nav>
    </aside>
  );
}
