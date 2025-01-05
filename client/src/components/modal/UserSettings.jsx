import { useProvider } from "../../context/GlobalProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const UserSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();
  const { mount, setMount } = useProvider();
  const isModalOpen = location.pathname === `/${username}`;
  const handleCloseModal = () => {
    setMount(false);
    navigate(-1);
  };

  if (!mount) return null;

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => !open && handleCloseModal()}
      >
        <DialogContent variant="options" className="max-w-lg">
          <DialogTitle className="text-center content_margin">
            <h3>Settings</h3>
          </DialogTitle>

          <div>CONTENT SETTINGS</div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserSettings;
