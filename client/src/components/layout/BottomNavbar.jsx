import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { CreateNewPost } from "@/components/modal/CreateNewPost";
import { Home, Compass, MessageCircle, Bell } from "lucide-react";

const nav_items = [
  { to: "/", icon: Home },
  { to: "/explore", icon: Compass },
  { to: "/message", icon: MessageCircle },
  { to: "/notification", icon: Bell },
];

const BottomNavbar = () => {
  const { user } = useAuthStore();

  return (
    <div className="md:hidden fixed bottom-0 w-full px-4 bg-background border-t">
      <nav className="flex items-center justify-between">
        {nav_items.map(({ to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="p-4 rounded-lg hover:bg-gray-100 duration-300"
          >
            <Icon size={24} />
          </Link>
        ))}

        <CreateNewPost />

        <Link
          to={`/${user.username}`}
          className="p-4 rounded-lg hover:bg-gray-100 duration-300"
        >
          <Avatar avatar={user.avatar} />
        </Link>
      </nav>
    </div>
  );
};

export default BottomNavbar;
