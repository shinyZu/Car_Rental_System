import React, { useState, createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginService from "../../services/LoginService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // export const AuthProvider = (props) => {
  // console.log(children);
  const [user, setUser] = useState({
    email: "",
    password: "",
    userStatus: "",
  });

  // const navigate = useNavigate();
  // const location = useLocation();
  // const redirectPath = location.state?.path || "/";

  const login = (user) => {
    setUser(user);
    // let res = await LoginService.loginUser(loginFormData);
    // console.log(res);
    // if (res.status === 200) {
    //   console.log(loginFormData);
    //   if (loginFormData.userStatus == "Admin") {
    //     console.log("Admin Logged Successfully");
    //     // auth.login(loginFormData);
    //     navigate("/dashboard" /* , { replace: true } */);

    //     //------------
    //   } else if (loginFormData.userStatus == "Customer") {
    //     console.log("Customer Logged Successfully");
    //     // auth.login(loginFormData);
    //     navigate(redirectPath, { replace: true });
    //     props.onClose();
    //     props.handleSnackbar();

    //     //--------
    //   } else if (loginFormData.userStatus == "Driver") {
    //     console.log("Driver Logged Successfully");
    //     // auth.login(loginFormData);
    //     navigate("/driver_schedule", { replace: true });
    //   }
    // } else {
    //   console.log(res);
    // }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
      {/* {props.children} */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
