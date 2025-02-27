/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";

const SearchInput = ({ searchForm, setOpenSearch }) => {
  return (
    <div className="w-full">
      <Input
        name="username"
        placeholder="Search by username..."
        value={searchForm?.values?.username}
        onBlur={() => setOpenSearch((prev) => !prev)}
        onChange={searchForm?.handleChange}
        className="w-full border-muted-foreground/20"
      />
    </div>
  );
};

export default SearchInput;
