import {
  Home,
  Bell,
  Search,
  Compass,
  SquarePlus,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import NavItem from "../sidebar/NavItem";
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import SearchPanel from "../notifications/SearchPanel";
import useOpenSlidePanel from "@/hooks/useOpenSlidePanel";
import { CreateNewPost } from "@/components/modal/CreateNewPost";

export default function Sidebar() {
  const { user } = useAuthStore();
  const [openCreate, setOpenCreate] = useState(false);
  const { handleOpenPanel, openPanel, panelRef } = useOpenSlidePanel();

  const labelClass = cn(
    openPanel ? "opacity-0" : "opacity-100",
    "duration-300 transition-all ease-in"
  );

  return (
    <aside className="flex h-screen relative w-96">
      <SearchPanel openPanel={openPanel} panelRef={panelRef} />
      <CreateNewPost isOpen={openCreate} setIsOpen={setOpenCreate} />

      <nav
        className={cn(openPanel ? "w-20" : "w-full", "side-navbar space-y-4")}
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
          onClick={handleCreatePost}
          icon={<SquarePlus size={24} />}
        />
        <NavItem
          label="Profile"
          to={`/${user.username}`}
          labelClass={labelClass}
          icon={<Avatar avatar={user.avatar} />}
        />
      </nav>
    </aside>
  );
}
