import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Session/Auth";

function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <>
      Welcome {auth.user}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Profile;
