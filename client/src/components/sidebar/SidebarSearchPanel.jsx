import { motion } from "framer-motion";
import { animateSearch } from "../../config";
import { Input } from "@/components/ui/input";

// eslint-disable-next-line react/prop-types
const SidebarSearchPanel = ({ openSearch }) => {
  return (
    <motion.div
      className="searchbar_wrapper"
      initial="close"
      animate={openSearch ? "open" : "close"}
      variants={animateSearch}
    >
      <div className="px-3">
        <div className="flex py-10">
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
