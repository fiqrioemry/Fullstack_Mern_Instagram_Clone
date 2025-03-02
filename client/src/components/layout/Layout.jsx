import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";
import { Outlet } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import { ScrollArea } from "@/components/ui/scroll-area";

const Layout = () => {
  return (
    <main className="flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <SideNavbar />
        <ScrollArea className="flex-1 overflow-y-auto md:h-screen h-[calc(100vh-56px-56px)]">
          <Outlet />
        </ScrollArea>
      </div>
      <BottomNavbar />
    </main>
  );
};

export default Layout;
