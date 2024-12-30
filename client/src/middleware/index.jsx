import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useProvider } from "../context/GlobalProvider";

const nonAuthPath = ["/signin", "/signup"];
const authPath = ["/", "/settings", "/profile", "/explore", "/:username"];

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const { currentPath, isAuthUser, userData } = useProvider();

  if (isAuthUser === null) return null;

  if (userData && nonAuthPath.includes(currentPath)) return <Navigate to="/" />;

  if (!userData && authPath.includes(currentPath))
    return <Navigate to="/signin" />;

  return <Fragment>{children}</Fragment>;
};

export default AuthRoute;
