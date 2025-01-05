import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  ChevronLeft,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";
import useHandleDarkMode from "../../hooks/useHandleDarkMode";

// eslint-disable-next-line react/prop-types
function MenuOptions({ openSearch }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { handleDarkMode, darkMode } = useHandleDarkMode();
  const [showModeToggle, setShowModeToggle] = useState(false);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowModeToggle(false);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button onClick={() => setOpen(!open)} variant="nav" size="lg">
          <Menu />
          {!openSearch && <div className="hidden lg:block">More</div>}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={ref}
        className={cn("w-64  transition-opacity", !open && "opacity-0")}
        align="end"
        alignOffset={-40}
      >
        {!showModeToggle ? (
          <>
            <DropdownMenuItem>
              <Settings size={20} />
              <p>Settings</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bookmark size={20} />
              <p>Saved</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowModeToggle(true)}>
              <Moon size={20} />
              <p>Switch appearance</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut size={20} />
              <p>Log out</p>
            </DropdownMenuItem>
          </>
        ) : (
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
              className="hover:bg-foreground-hover flex items-center gap-x-2 px-4 py-2 m-1.5 rounded-lg font-medium cursor-pointer"
            >
              Dark Mode
              <DropdownMenuItem className="ml-auto p-0">
                <Switch
                  id="dark-mode"
                  className="ml-auto"
                  checked={darkMode}
                  onCheckedChange={handleDarkMode}
                />
              </DropdownMenuItem>
            </Label>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MenuOptions;
