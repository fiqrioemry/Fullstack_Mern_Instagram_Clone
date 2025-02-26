/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

const NoSelectedChat = ({ setOpen }) => {
  return (
    <div className="h-full flex-center">
      <Button onClick={() => setOpen(true)} variant="accent">
        Start message
      </Button>
    </div>
  );
};

export default NoSelectedChat;
