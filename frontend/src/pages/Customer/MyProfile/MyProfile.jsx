import React from "react";
import DriverNavbar from "../../../components/NavBar/DriverNavbar";
import NavBarRegistered from "../../../components/NavBar/NavBarRegistered";
import Driver from "../../Driver/Driver";
import { useAuth } from "../../Session/Auth";

function MyProfile(props) {
  const auth = useAuth();
  console.log(auth);

  return (
    <>
      {auth.user && auth.user.userStatus == "Customer" && <NavBarRegistered />}

      {auth.user && auth.user.userStatus == "Driver" && <DriverNavbar />}
    </>
  );
}

export default MyProfile;
