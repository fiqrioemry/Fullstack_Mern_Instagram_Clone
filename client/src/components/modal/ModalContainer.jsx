/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function ModalContainer({ children, title }) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        {title}
      </DialogTrigger>
      <DialogContent variant="options" className="sm:max-w-[425px]">
        {children}
      </DialogContent>
    </Dialog>
  );
}
