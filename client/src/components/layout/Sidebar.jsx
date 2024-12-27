import { motion } from "framer-motion";
import { animateSearch } from "../../config";
import SidebarContent from "../sidebar/SidebarContent";
import { useProvider } from "../../context/GlobalProvider";
import SidebarSearchPanel from "../sidebar/SidebarSearchPanel";

const Sidebar = () => {
  const { searchActive, handleSearch } = useProvider();

  return (
    <aside className="fixed bottom-0 right-0 left-0 w-full md:relative md:w-[225px] z-10 ">
      <SidebarSearchPanel searchActive={searchActive} />
      <motion.div
        className={`relative md:absolute bg-red-500 py-2 md:py-0 bg-background z-20 h-full ${
          searchActive ? "w-[75px]" : "w-full"
        } border-r overflow-hidden duration-300 transition-all`}
      >
        <SidebarContent
          searchActive={searchActive}
          handleSearch={handleSearch}
        />
      </motion.div>
    </aside>
  );
};

export default Sidebar;
