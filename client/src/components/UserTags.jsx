import { Camera } from "lucide-react";

const UserTags = () => {
  return (
    <div className="text-center space-y-3 py-12">
      <div className="flex items-center justify-center">
        <div className="p-4  rounded-full border">
          <Camera size={50} />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">PHOTOS OF YOU</h1>
      </div>
      <div className="flex justify-center">
        <div className="max-w-96 text-sm">
          When you share photos, they will appear on your profile.
        </div>
      </div>
    </div>
  );
};

export default UserTags;
