/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export function ModalContainer({ children, title }) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        {title}
      </DialogTrigger>
      <DialogTitle>
        <DialogContent variant="options" className=" sm:max-w-[425px]">
          {children}
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
}
