import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { useProvider } from "../context/GlobalProvider";
import { Compass, Heart, Home, PlusSquare, Search } from "lucide-react";

const links = [
  { name: "Home", href: "/", icon: Home },
  {
    name: "Search",
    icon: Search,
    hideOnMobile: true,
  },
  { name: "Explore", href: "/explore", icon: Compass },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Heart,
    hideOnMobile: true,
  },
  {
    name: "Create",
    icon: PlusSquare,
  },
];

function NavLinks() {
  const { currentPath, handleOpenModal, handleSearch } = useProvider();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = currentPath === link.href;
        const handleClick =
          link.name === "Search"
            ? handleSearch
            : link.name === "Create"
            ? () => handleOpenModal("search")
            : null;

        return (
          <Link
            key={link.name}
            onClick={handleClick}
            to={link.href}
            className={buttonVariants({
              variant: "nav",
              className: cn("navLink", { "hidden md:flex": link.hideOnMobile }),
              size: "lg",
            })}
          >
            <LinkIcon className="w-6" />
            <span
              className={`${cn("hidden lg:block", {
                "font-extrabold": isActive,
              })}`}
            >
              {link.name}
            </span>
          </Link>
        );
      })}
    </>
  );
}

export default NavLinks;
