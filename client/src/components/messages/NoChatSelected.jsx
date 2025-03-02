import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/useChatStore";

const NoChatSelected = () => {
  const { handleOpen } = useChatStore();

  return (
    <div className="h-full flex-center">
      <Button onClick={handleOpen} variant="accent">
        Start message
      </Button>
    </div>
  );
};

export default NoChatSelected;
