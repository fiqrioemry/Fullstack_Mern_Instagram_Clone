import { useProvider } from "../context/GlobalProvider";

const AuthRoute = () => {
  const { currentPath, isUserAuth } = useProvider();
  return <div></div>;
};

export default AuthRoute;
