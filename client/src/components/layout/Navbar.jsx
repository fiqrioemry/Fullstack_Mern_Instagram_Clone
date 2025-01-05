import WebLogo from "../WebLogo";
import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container mx-auto px-3 flex items-center justify-between">
        <WebLogo />
        <div className="flex items-center space-x-3">
          <Input className="rounded-[8px] w-60" />
          <Settings className="cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
