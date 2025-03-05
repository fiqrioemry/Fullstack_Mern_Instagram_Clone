import { Bookmark } from "lucide-react";

const ProfileSaved = () => {
  return (
    <div className="text-center space-y-3 py-12">
      <div className="flex items-center justify-center">
        <div className="p-4 rounded-full border">
          <Bookmark size={50} />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">saved</h1>
      </div>
      <div className="flex justify-center">
        <div className="max-w-96 text-sm">
          Save photos and videos that you want to see again. No one is notified,
          and only you can see what you have saved.
        </div>
      </div>
    </div>
  );
};

export default ProfileSaved;
