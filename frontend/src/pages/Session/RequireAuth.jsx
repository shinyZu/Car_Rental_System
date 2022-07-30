import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import Login from "../Login/Login";
import NotFound from "./NotFound";

function RequireAuth({ children }) {
  //   console.log(children);
  const auth = useAuth();
  const location = useLocation();
  console.log(auth);
  console.log(location);

  // useEffect(() => {
  //   console.log("qqqqqqqqqqqqqqqqqq");
  // }, []);
  if (auth.user.email == null) {
    console.log("User still not login... cannot access profile");
    // return <Navigate to="/testLogin" state={{ path: location.pathname }} />;
    return <Navigate to="*" state={{ path: location.pathname }} />;
  }
  return children;
}

export default RequireAuth;
