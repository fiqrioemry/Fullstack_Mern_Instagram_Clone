import { Link } from "react-router-dom";
import { DialogClose } from "@/components/ui/dialog";

const SettingOptions = () => {
  return (
    <div>
      <button className="w-full border-muted-foreground/25 h-12 border-b text-primary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aperiam
        veritatis quas esse delectus sed ut voluptatem repudiandae cupiditate
        illo.
      </button>
      <button className="w-full border-muted-foreground/25 h-12 border-b bg-[#0284c7] hover:bg-[#075985]">
        Edit
      </button>
      <Link className="w-full flex items-center justify-center border-muted-foreground/25 h-12 border-b">
        Go to post
      </Link>
      <DialogClose className="w-full h-12">Close</DialogClose>
    </div>
  );
};

export default SettingOptions;
