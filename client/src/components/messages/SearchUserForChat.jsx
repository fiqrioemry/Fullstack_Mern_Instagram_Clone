import { X } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import useHandleSearch from "@/hooks/useHandleSearch";
import SearchInput from "@/components/search/SearchInput";
import SearchResult from "@/components/search/SearchResult";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

// eslint-disable-next-line react/prop-types
const SearchUserForChat = ({ open, setOpen }) => {
  const { setSelectedUser } = useChatStore();
  const { users, searching, searchTerm, searchForm } = useHandleSearch();

  const handleNewChat = (user) => {
    setSelectedUser(user);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(prev) => setOpen(prev)}>
      <DialogContent>
        <div className="flex justify-end px-2">
          <DialogClose asChild>
            <button type="button">
              <X />
            </button>
          </DialogClose>
        </div>
        <div className="px-4 h-[26rem]">
          <SearchInput searchForm={searchForm} />

          {searchForm?.values?.username?.length > 0 && (
            <SearchResult
              users={users}
              searching={searching}
              searchTerm={searchTerm}
              onClick={handleNewChat}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUserForChat;
