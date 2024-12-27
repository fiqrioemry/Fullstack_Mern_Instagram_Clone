import { motion } from "framer-motion";
import { animateSearch } from "../../config";
import { Input } from "@/components/ui/input";

const SidebarSearchPanel = ({ searchActive }) => {
  return (
    <motion.div
      className="fixed top-0 bottom-0 left-[75px] w-[325px] h-full bg-background border-r z-10"
      initial="close"
      animate={searchActive ? "open" : "close"}
      variants={animateSearch}
    >
      <div className="px-3">
        <div className="flex items-center h-[100px]">
          <h3>Search panel</h3>
        </div>
        <form>
          <Input />
        </form>
      </div>
    </motion.div>
  );
};

export default SidebarSearchPanel;
