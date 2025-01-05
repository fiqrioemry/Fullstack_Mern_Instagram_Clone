/* eslint-disable react/prop-types */
import InstagramIcon from "./common/InstagramIcon";
import InstagramLogo from "./common/InstagramLogo";

const WebLogo = ({ openSearch }) => {
  return (
    <div className="flex items-center justify-center">
      {openSearch ? <InstagramIcon /> : <InstagramLogo size={30} width={105} />}
    </div>
  );
};

export default WebLogo;
