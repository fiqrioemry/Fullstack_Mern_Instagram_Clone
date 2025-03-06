/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/display-name
const NavItem = forwardRef(
  ({ to, onClick, icon, label, labelClass, notifications = null }, ref) => {
    const props = to ? { to } : { onClick };

    const notificationsCount = notifications?.filter(
      (notif) => notif.isRead === false
    );
    return (
      <Link ref={ref} className="btn-nav relative " {...props}>
        <div className="flex items-center justify-center py-2 px-2">{icon}</div>
        <span className={labelClass}>{label}</span>
        {notifications && notificationsCount.length > 0 && (
          <div className="absolute h-4 w-4 rounded-full bg-red-500 text-[10px] bottom-7 left-7 flex items-center justify-center">
            {notificationsCount.length}
          </div>
        )}
      </Link>
    );
  }
);

export default NavItem;
