import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import InstagramLogo from "../common/InstagramLogo";

const Navbar = () => {
  return (
    <nav className="bg-background py-3 px-6 fixed top-0 right-0 left-0 md:hidden border-b z-10">
      <div className="container mx-auto px-3 flex items-center justify-between">
        <InstagramLogo size={30} width={120} />
        <div className="flex items-center space-x-3">
          <Input className="rounded-[8px] w-60" />
          <Settings className="cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
