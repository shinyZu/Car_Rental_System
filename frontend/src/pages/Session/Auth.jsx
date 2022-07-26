import React, { useState, createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginService from "../../services/LoginService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: null,
    password: null,
    userStatus: null,
  });

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
