/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";

const SearchInput = ({ searchForm, handleSearch }) => {
  return (
    <div className="w-full">
      <Input
        name="username"
        placeholder="Search by username..."
        value={searchForm?.values?.username}
        onClick={handleSearch}
        onChange={searchForm?.handleChange}
        className="text-sm md:text-md w-full border-muted-foreground/20"
      />
    </div>
  );
};

export default SearchInput;
