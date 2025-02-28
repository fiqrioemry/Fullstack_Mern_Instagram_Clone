/* eslint-disable react/prop-types */
import NavItem from "./NavItem";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import useTheme from "@/hooks/useTheme";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Menu, Moon, Sun, LogOut, Settings, ChevronLeft } from "lucide-react";

function NavOptions({ openSearch }) {
  const ref = useRef(null);
  const { signout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const { handleDarkMode, darkMode } = useTheme();
  const [showModeToggle, setShowModeToggle] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowModeToggle(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const labelClass = cn(
    openSearch ? "opacity-0" : "opacity-100",
    "duration-300 transition-all ease-in hidden lg:block"
  );

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <NavItem
          label="More"
          onClick={handleOpen}
          labelClass={labelClass}
          icon={<Menu size={24} />}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent ref={ref} className="bg-secondary">
        {showModeToggle ? (
          <>
            <DropdownMenuItem onClick={() => setShowModeToggle(false)}>
              <ChevronLeft />
              <p className="font-bold ml-1">Switch appearance</p>
              {darkMode ? (
                <Moon size={20} className="ml-auto" />
              ) : (
                <Sun size={20} className="ml-auto" />
              )}
            </DropdownMenuItem>
            <Label
              htmlFor="dark-mode"
              className="flex items-center gap-x-2 px-4 py-2 m-1.5 rounded-lg font-medium cursor-pointer hover:bg-foreground-hover"
            >
              Dark Mode
              <DropdownMenuItem className="ml-auto p-0">
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={handleDarkMode}
                />
              </DropdownMenuItem>
            </Label>
          </>
        ) : (
          <>
            <Link to="/settings">
              <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => setShowModeToggle(true)}>
              <Moon />
              <span>Switch appearance</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signout}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavOptions;
