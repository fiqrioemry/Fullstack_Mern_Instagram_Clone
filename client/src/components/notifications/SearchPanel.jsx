import { cn } from "@/lib/utils";

const SearchPanel = ({ openPanel, panelRef }) => {
  return (
    <div
      ref={openPanel === "search" ? panelRef : null}
      className={cn(
        openPanel === "search" ? "w-96" : "w-0",
        "absolute bg-white left-20 h-full z-20  delay-150  overflow-hidden transition-all duration-300 border-r border-muted-foreground/50"
      )}
    >
      <div className="w-96 px-4">
        <h2>Search</h2>
        <input className="py-2 px-4 w-full border rounded-md" />
      </div>
    </div>
  );
};

export default SearchPanel;
