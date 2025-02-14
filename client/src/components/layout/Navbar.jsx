import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container mx-auto px-3 flex items-center justify-between">
        <h3>Monongram</h3>
        <div className="flex items-center space-x-3">
          <Input className="w-72" />
          <Settings className="cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
