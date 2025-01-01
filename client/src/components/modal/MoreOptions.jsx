import { Link } from "react-router-dom";
import { DialogClose } from "@radix-ui/react-dialog";

const MoreOptions = () => {
  return (
    <div>
      <button className="w-full border-muted-foreground/25 h-12 border-b">
        Delete
      </button>
      <button className="w-full border-muted-foreground/25 h-12 border-b">
        Edit
      </button>
      <Link className="w-full flex items-center justify-center border-muted-foreground/25 h-12 border-b">
        Go to post
      </Link>
      <DialogClose className="w-full h-12">Close</DialogClose>
    </div>
  );
};

export default MoreOptions;
