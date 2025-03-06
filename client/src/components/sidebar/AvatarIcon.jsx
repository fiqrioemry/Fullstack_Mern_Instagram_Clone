import { useAuthStore } from "@/store/useAuthStore";

const AvatarIcon = () => {
  const { user } = useAuthStore();

  return (
    <div className="w-8 h-8 border border-muted overflow-hidden rounded-full flex-shrink-0 ">
      <img
        src={user.avatar}
        alt="avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default AvatarIcon;
