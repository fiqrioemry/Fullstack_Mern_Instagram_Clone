import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line react/prop-types
const GoogleAuth = ({ buttonTitle }) => {
  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div>
      <Button onClick={handleGoogleAuth} className="w-full">
        <FcGoogle size={24} />
        {buttonTitle}
      </Button>
    </div>
  );
};

export default GoogleAuth;
