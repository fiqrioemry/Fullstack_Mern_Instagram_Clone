import { cn } from "@/lib/utils";

const NotificationPanel = ({ openPanel, panelRef }) => {
  return (
    <div
      ref={openPanel === "notification" ? panelRef : null} // Gunakan panelRef hanya jika panel terbuka
      className={cn(
        openPanel === "notification" ? "w-96" : "w-0",
        "absolute bg-background left-20 h-full z-20 delay-150 overflow-hidden transition-all duration-300 border-r border-muted-foreground/50 "
      )}
    >
      <div className="w-96 px-4 space-y-4">
        <h2>Notifications</h2>
        <p>1. Notification 1</p>
        <p>2. Notification 2</p>
        <p>3. Notification 3</p>
        <p>4. Notification 4</p>
        <p>5. Notification 5</p>
      </div>
    </div>
  );
};

export default NotificationPanel;
