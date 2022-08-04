import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import logo from "../../assets/images/logo2.jpg";
import profile from "../../assets/images/female_profile.jpg";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FileChooser from "../common/FileChooser/FileChooser";

function Avatar(props) {
  const { classes } = props;
  const [hover, setHover] = useState(false);
  const [profileImg, setProfileImg] = useState(profile);
  // const onHover = () => {
  //   setHover(true);
  //   console.log("mouse hovered in");
  // };

  // const onLeave = () => {
  //   setHover(false);
  //   console.log("mouse hovered out");
  // };

  function handleAvatarUpload(e) {
    const { files } = e.target;
    console.log(e);
    console.log(files);
    // setProfileImg(files[0]);
    // console.log(profileImg);

    let images = [],
      fileReaders = [];

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const { result } = e.target;
      console.log(result);
      if (result) {
        setProfileImg(result); // urls
      }
      console.log(profileImg);
    };
    // console.log(fileReader.readAsDataURL(files[0]));
    fileReader.readAsDataURL(files[0]);
  }

  return (
    <>
      {props.page === "about" && (
        <div
          className={classes.avatar__container}
          style={{
            marginTop: "-380px",
            position: "absolute",
            right: "0px",
            left: "0px",
          }}
        >
          <img src={logo} className={classes.avatar__img} />
        </div>
      )}

      {props.page === "profile" && (
        <div
          className={classes.avatar__container}
          style={{
            marginTop: "0px",
            width: "17rem",
            height: "17rem",
          }}
        >
          <img
            // src={profileImg}
            src={props.profile_img}
            className={classes.avatar__img}
            style={{ margin: "9px 9px" }}
          />
          {/* <FileChooser
            page="profile"
            onUpload={(e) => {
              handleAvatarUpload(e);
            }}
          /> */}
        </div>
      )}
    </>
  );
}

export default withStyles(styleSheet)(Avatar);
// {hover ? (
//   // <AddAPhotoIcon
//   //   fontSize="large"
//   //   /* color="black" */ style={{
//   //     // border: "2px solid red",
//   //     position: "absolute",
//   //     top: "0",
//   //     left: "0",
//   //     right: "0",
//   //     bottom: "0",
//   //     margin: "auto",
//   //     "&:hover": {
//   //       cursor: "pointer !important",
//   //     },
//   //   }}
//   //   onMouseEnter={onCameraHover}
//   //   onClick={updateAvatar}
//   // />
// ) : null}
