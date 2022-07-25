import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Session/Auth";

function TestLogin() {
  const [user, setUser] = useState("");
  const auth = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || "/";

  const handleLogin = () => {
    auth.login(user);
    navigate(redirectPath, { replace: true });
  };

  return (
    <>
      <label>
        Username :{" "}
        <input
          type="text"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default TestLogin;
