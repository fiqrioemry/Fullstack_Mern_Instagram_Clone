/* eslint-disable react/prop-types */

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import useTheme from "@/hooks/useTheme";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/useAuthStore";
import { Moon, Sun, LogOut, Settings, ChevronLeft } from "lucide-react";

function MoreOptions({ open, SetOpen, toggleTheme, setToggleTheme, moreRef }) {
  const { signout } = useAuthStore();
  const { handleDarkMode, darkMode } = useTheme();

  return (
    <DropdownMenu open={open}>
      <DropdownMenuContent ref={moreRef} className="bg-secondary">
        {toggleTheme ? (
          <>
            <DropdownMenuItem onClick={() => setToggleTheme(false)}>
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
            <DropdownMenuItem onClick={() => setToggleTheme(true)}>
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

export default MoreOptions;
