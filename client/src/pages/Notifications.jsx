import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

const Notifications = () => {
  const { notifications, getNotifications } = useUserStore();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <div className="flex flex-col mx-2 md:mx-8 space-y-4">
      {notifications?.map((notif, index) => {
        let message = "";

        switch (notif.type) {
          case "comment":
            message = notif.commentId
              ? `replied to your comment: "${notif.comment}"`
              : `commented on your post: "${notif.post}"`;
            break;

          case "like":
            message = notif.commentId
              ? "liked your comment"
              : "liked your post";
            break;

          case "mention":
            message = `mentioned you in a post: "${notif.comment}"`;
            break;

          case "follow":
            message = "started following you";
            break;

          case "reply":
            message = `replied to your comment: "${notif.comment}"`;
            break;

          default:
            message = "sent you a notification";
        }

        return (
          <div
            key={index}
            className="flex items-center space-x-3 bg-background border border-muted p-3 rounded-lg shadow-md"
          >
            {/* Avatar */}
            <img
              src={notif.avatar}
              alt={notif.username}
              className="w-10 h-10 rounded-full border border-muted object-cover"
            />

            {/* Username & Notification Message */}
            <div className="flex-1">
              <p className="text-sm font-semibold">{notif.username}</p>
              <p className="text-sm text-gray-600">{message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
