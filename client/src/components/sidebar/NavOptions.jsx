/* eslint-disable react/prop-types */
import {
  Menu,
  Moon,
  Sun,
  LogOut,
  Bookmark,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTheme from "@/hooks/useTheme";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

function NavOption({ openSearch }) {
  const ref = useRef(null);
  const { signout } = useAuthStore();
  const { handleDarkMode, darkMode } = useTheme();
  const [open, setOpen] = useState(false);
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

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center hover:bg-gray-100 w-full rounded-md"
        >
          <div className="flex justify-center w-20 p-4">
            <Menu size={24} />
          </div>
          <span
            className={cn(
              openSearch ? "opacity-0" : "opacity-100",
              "duration-300 transition-all ease-in"
            )}
          >
            More
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={ref}
        className={cn("w-64", !open && "opacity-0")}
        align="end"
        alignOffset={-40}
      >
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
            <DropdownMenuItem>
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bookmark />
              <span>Saved</span>
            </DropdownMenuItem>
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

export default NavOption;
