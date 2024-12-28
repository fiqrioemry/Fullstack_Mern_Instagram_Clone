import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import InstagramLogo from "../common/InstagramLogo";
import InstagramIcon from "../common/InstagramIcon";
import { sidebarConfiguration } from "../../config";
import useHandleModal from "../../hooks/useHandleModal";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import useHandleDarkMode from "../../hooks/useHandleDarkMode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProvider } from "../../context/GlobalProvider";

// eslint-disable-next-line react/prop-types
const SidebarContent = ({ openSearch, handleSearch }) => {
  const navigate = useNavigate();
  const { handleOpenModal } = useProvider();
  const { handleDarkMode, darkMode } = useHandleDarkMode();

  const handleNavigate = (params) => {
    navigate(`/${params}`);
  };

  const navigationMenu = sidebarConfiguration({
    handleNavigate,
    handleOpenModal,
    handleSearch,
  });

  return (
    <div className="px-3">
      <div className="hidden md:block py-10 px-3">
        {openSearch ? (
          <InstagramIcon />
        ) : (
          <InstagramLogo size={30} width={105} />
        )}
      </div>

      <div className="flex md:block">
        {navigationMenu.map((menu) => (
          <Button
            size="lg"
            variant="nav"
            onClick={menu.action}
            key={menu.title}
          >
            <menu.icon size={26} />
            {!openSearch && (
              <span className="hidden md:block">{menu.title}</span>
            )}
          </Button>
        ))}
      </div>
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="lg" variant="nav">
              <MenuIcon size={26} />
              {!openSearch && <span className="hidden md:block">more</span>}
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
