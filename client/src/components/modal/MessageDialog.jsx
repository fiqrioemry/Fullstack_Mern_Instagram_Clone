import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const MessageDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="following">
          <Mail size={16} /> Send message
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] p-4">
        <div className="text-center mb-4">
          <h4>Hi, Tell me what you need</h4>
          <p>Insha Allah, i will response ASAP</p>
        </div>
        <Textarea placeholder="write your message or request here " />
        <div>
          <Button variant="destructive">Cancel</Button>
          <Button variant="follow">Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
