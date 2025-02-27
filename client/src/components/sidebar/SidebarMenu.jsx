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
import { useAuthStore } from "@/store/useAuthStore";
import { useRef, useState } from "react";
import useOpenSlideBar from "../../hooks/useOpenSlidePanel";
import MenuItem from "./MenuItem";
import NotificationsBar from "../notifications/NotificationPanel";

const SidebarMenu = () => {
  const { user } = useAuthStore();
  const triggerRef = useRef(null);
  const [openSlidebar, setOpenSlidebar] = useState(false);

  const { handleOpen } = useOpenSlideBar(
    openSlidebar,
    setOpenSlidebar,
    triggerRef
  );

  const labelClass = cn(
    openSlidebar ? "opacity-0" : "opacity-100",
    "duration-300 transition-all ease-in"
  );

  return (
    <>
      <nav className={cn(openSlidebar ? "w-20" : "w-96", "sidebar")}>
        <button ref={triggerRef} onClick={handleOpen} className="btn-nav">
          <NotificationsBar open={openSlidebar} triggerRef={triggerRef} />

          <div className="flex-center w-20 px-3 py-2">{<Search />}</div>
          <span className={labelClass}>search</span>
        </button>
      </nav>
    </>
  );
};

export default SidebarMenu;
