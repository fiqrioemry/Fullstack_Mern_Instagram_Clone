/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useProvider } from "../context/GlobalProvider";

export const AuthRoute = ({ children }) => {
  const { isAuthenticate } = useProvider();

  if (isAuthenticate === false) return <Navigate to="/signin" />;

  return <Fragment>{children}</Fragment>;
};

export const NonAuthRoute = ({ children }) => {
  const { isAuthenticate } = useProvider();

  if (isAuthenticate === true) return <Navigate to="/" />;

  return <Fragment>{children}</Fragment>;
};
