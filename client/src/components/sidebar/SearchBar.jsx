import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// eslint-disable-next-line react/prop-types
const Searchbar = ({ openSearch, searchRef }) => {
  return (
    <div
      ref={searchRef}
      className={cn(
        openSearch ? "left-0" : "left-20",
        "absolute top-0 bottom-0 w-80 h-full bg-background border-r z-10"
      )}
    >
      <div className="px-3">
        <div className="flex py-10">
          <h3>Search panel</h3>
        </div>
        <form>
          <Input />
        </form>
      </div>
    </div>
  );
};

export default Searchbar;
