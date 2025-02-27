import { cn } from "@/lib/utils";
import { Bell, Search } from "lucide-react";
import SearchPanel from "../notifications/SearchPanel";
import useOpenSlidePanel from "../../hooks/useOpenSlidePanel";
import NotificationPanel from "../notifications/NotificationPanel";

export default function Sidebar() {
  const { handleOpen, openPanel, panelRef } = useOpenSlidePanel();

  return (
    <aside className="flex h-screen relative w-96">
      {/* Kirim panelRef agar bisa mendeteksi klik di luar */}
      <SearchPanel openPanel={openPanel} panelRef={panelRef} />
      <NotificationPanel openPanel={openPanel} panelRef={panelRef} />

      <nav
        ref={panelRef}
        className={cn(
          openPanel ? "w-20" : "w-20",
          "absolute bg-background h-full z-30 border-r duration-300 overflow-hidden"
        )}
      >
        <button
          ref={panelRef}
          onClick={() => handleOpen("search")}
          className="py-2 w-96 flex items-center gap-4 hover:bg-muted-foreground/50 duration-300"
        >
          <Search className="w-20" />
          <span>search</span>
        </button>

        <button
          ref={panelRef}
          onClick={() => handleOpen("notification")}
          className="py-2 w-96 flex items-center gap-4 hover:bg-muted-foreground/50 duration-300"
        >
          <Bell className="w-20" />
          <span>notification</span>
        </button>
      </nav>
    </aside>
  );
}
