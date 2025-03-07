/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Link } from "react-router-dom";

const NavItem = forwardRef(
  ({ to, onClick, icon, label, labelClass, notifications = [] }, ref) => {
    const props = to ? { to } : { onClick };

    const unreadNotifications = notifications.filter((notif) => !notif.isRead);
    const hasUnreadNotifications = unreadNotifications.length > 0;

    return (
      <Link ref={ref} className="btn btn-nav justify-start relative" {...props}>
        {/* Icon */}
        <div className="flex items-center justify-center py-2 px-2">{icon}</div>

        {/* Label */}
        <span className={labelClass}>{label}</span>

        {/* Notification Badge */}
        {hasUnreadNotifications && (
          <div className="absolute h-4 w-4 rounded-full bg-red-500 text-[10px] bottom-7 left-7 flex items-center justify-center">
            {unreadNotifications.length}
          </div>
        )}
      </Link>
    );
  }
);

export default NavItem;
