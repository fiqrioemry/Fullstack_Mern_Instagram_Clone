import { X } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useChatStore } from "@/store/useChatStore";
import useHandleSearch from "@/hooks/useHandleSearch";
import SearchInput from "@/components/search/SearchInput";
import SearchResult from "@/components/search/SearchResult";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

// eslint-disable-next-line react/prop-types
const SearchUserForChat = ({ open, setOpen }) => {
  const { setSelectedUser } = useChatStore();

  const { users, searching, searchUser } = useUserStore();

  const { searchForm, searchRef, handleSearch } = useHandleSearch(searchUser);

  const handleNewChat = (user) => {
    setOpen(false);
    searchForm.resetForm();
    setSelectedUser(user);
  };

  return (
    <Dialog open={open} onOpenChange={(prev) => setOpen(prev)}>
      <DialogContent>
        <div className="flex justify-end px-4 mb-2">
          <DialogClose asChild>
            <X />
          </DialogClose>
        </div>
        <div ref={searchRef} className="px-4 h-[26rem]">
          <SearchInput handleSearch={handleSearch} searchForm={searchForm} />

          {searchForm?.values?.username?.length > 0 && (
            <SearchResult
              users={users}
              searching={searching}
              onClick={handleNewChat}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUserForChat;
