import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const GoogleAuth = () => {
  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div>
      <Button onClick={handleGoogleAuth} className="w-full">
        <FcGoogle size={24} /> Sign in with Google
      </Button>
    </div>
  );
};

export default GoogleAuth;
