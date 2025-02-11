import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useProvider } from "../context/GlobalProvider";

// eslint-disable-next-line react/prop-types
export const AuthRoute = ({ children }) => {
  const { isAuthenticate } = useProvider();

  if (!isAuthenticate) return <Navigate to="/signin" />;

  return <Fragment>{children}</Fragment>;
};

export const NonAuthRoute = ({ children }) => {
  const { isAuthenticate } = useProvider();

  if (isAuthenticate) return <Navigate to="/" />;

  return <Fragment>{children}</Fragment>;
};
