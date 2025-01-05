import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { useProvider } from "../context/GlobalProvider";
import { Compass, Heart, Home, PlusSquare, Search } from "lucide-react";

const links = [
  { name: "Home", href: "/", icon: Home },
  { name: "Search", icon: Search, hideOnMobile: true },
  { name: "Explore", href: "/explore", icon: Compass },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Heart,
    hideOnMobile: true,
  },
  { name: "Create", icon: PlusSquare },
];

function NavLinks() {
  const { currentPath, handleOpenModal, openSearch, handleSearch } =
    useProvider();

  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = currentPath === link.href;
        const handleClick =
          link.name === "Search"
            ? handleSearch
            : link.name === "Create"
            ? () => handleOpenModal("create")
            : undefined;

        return (
          <Link
            key={link.name}
            to={link.href}
            onClick={handleClick}
            className={buttonVariants({
              variant: "nav",
              className: cn({
                "hidden md:flex": link.hideOnMobile,
              }),
              size: "lg",
            })}
          >
            <Icon className="w-8" />
            {!openSearch && (
              <span
                className={cn("hidden xl:block", { "font-bold": isActive })}
              >
                {link.name}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );
}

export default NavLinks;
