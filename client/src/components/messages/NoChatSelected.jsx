/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

const NoChatSelected = ({ setOpen }) => {
  return (
    <div className="h-full flex-center">
      <Button onClick={() => setOpen(true)} variant="accent">
        Start message
      </Button>
    </div>
  );
};

export default NoChatSelected;
