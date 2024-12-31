"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Activity,
  Bookmark,
  ChevronLeft,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useHandleDarkMode from "../../hooks/useHandleDarkMode";

function MoreDropdown() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [showModeToggle, setShowModeToggle] = useState(false);
  const { handleDarkMode, darkMode } = useHandleDarkMode();
  useEffect(() => {
    function handleOutsideClick(event) {
      if (!event.target) return;
      if (ref.current && !ref.current.contains(event.target.value)) {
        setShowModeToggle(false);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button onClick={() => setOpen(!open)} variant={"nav"} size={"lg"}>
          <Menu />
          <div className="hidden lg:block">More</div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={ref}
        className={cn(
          "dark:bg-accent w-64 p-0 transition-opacity",
          !open && "opacity-0"
        )}
        align="end"
        alignOffset={-40}
      >
        {!showModeToggle && (
          <>
            <DropdownMenuItem className="dark:hover:bg-[#3C3C3C] !cursor-pointer flex items-center gap-x-2 !px-4 !py-3.5 !m-1.5 !rounded-lg font-medium;">
              <Settings size={20} />
              <p>Settings</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="dark:hover:bg-[#3C3C3C] !cursor-pointer flex items-center gap-x-2 !px-4 !py-3.5 !m-1.5 !rounded-lg font-medium;">
              <Activity size={20} />
              <p>Your activity</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="dark:hover:bg-[#3C3C3C] !cursor-pointer flex items-center gap-x-2 !px-4 !py-3.5 !m-1.5 !rounded-lg font-medium;">
              <Bookmark size={20} />
              <p>Saved</p>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="dark:hover:bg-[#3C3C3C] !cursor-pointer flex items-center gap-x-2 !px-4 !py-3.5 !m-1.5 !rounded-lg font-medium;"
              onClick={() => setShowModeToggle(true)}
            >
              <Moon size={20} />
              <p>Switch appearance</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="dark:hover:bg-[#3C3C3C] !cursor-pointer flex items-center gap-x-2 !px-4 !py-3.5 !m-1.5 !rounded-lg font-medium;">
              <LogOut size={20} />
              <p>Log out</p>
            </DropdownMenuItem>
          </>
        )}

        {showModeToggle && (
          <>
            <div className="flex items-center border-b border-gray-200 dark:border-neutral-700 py-3.5 px-2.5">
              <ChevronLeft size={18} onClick={() => setShowModeToggle(false)} />
              <p className="font-bold ml-1">Switch appearance</p>
              {darkMode ? (
                <Moon size={20} className="ml-auto" />
              ) : (
                <Sun size={20} className="ml-auto" />
              )}
            </div>

            <Label
              htmlFor="dark-mode"
              className="dark:hover:bg-[#3C3C3C] !cursor-pointer flex items-center gap-x-2 !px-4 !py-3.5 !m-1.5 !rounded-lg font-medium"
            >
              Dark Mode
              <DropdownMenuItem className="ml-auto !p-0">
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

export default MoreDropdown;
