import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { sidebarNavigation } from "../../config";
import InstagramLogo from "../common/InstagramLogo";
import InstagramIcon from "../common/InstagramIcon";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import useToggleDarkMode from "../../hooks/useToggleDarkMode";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SidebarContent = ({ searchActive, handleSearch }) => {
  const { handleDarkMode, darkMode } = useToggleDarkMode();

  return (
    <div className="px-3">
      <header className="hidden md:flex items-center px-3 h-[100px]">
        {searchActive ? (
          <InstagramIcon />
        ) : (
          <InstagramLogo size={30} width={105} />
        )}
      </header>

      <div className="flex md:block">
        {sidebarNavigation.map((menu) => (
          <Link className="w-full" to={menu.path} key={menu.title}>
            <Button size="lg" variant="nav" onClick={handleSearch}>
              <menu.icon size={26} />
              {searchActive ? (
                ""
              ) : (
                <span className="hidden md:block">{menu.title}</span>
              )}
            </Button>
          </Link>
        ))}
      </div>
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="lg" variant="nav">
              <MenuIcon size={26} />
              {searchActive ? "" : <span>more</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Button size="lg" variant="menu" onClick={handleDarkMode}>
              {darkMode ? <span>Light mode</span> : <span>Dark mode</span>}
              {darkMode ? <MoonIcon /> : <SunIcon />}
            </Button>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SidebarContent;
