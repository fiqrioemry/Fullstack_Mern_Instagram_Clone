import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useProvider } from "@/context/GlobalProvider";

const NavSearch = () => {
  const { openSearch, searchRef } = useProvider();

  return (
    <div
      ref={searchRef}
      className={cn(
        openSearch ? "left-20" : "-left-96",
        "absolute top-0 bottom-0 w-80 h-full bg-background border-r z-10 duration-300 transition-all ease-in"
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

export default NavSearch;
