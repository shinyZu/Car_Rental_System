import React from "react";
import { Button } from "@mui/material";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";

function MyButton(props) {
  function handleButtonClick() {
    console.log("Button Clicked...");
  }

  return (
    <Button
      label={props.label}
      className={props.className}
      size={props.size}
      variant={props.variant}
      disabled={props.disabled}
      color={props.color}
      type={props.type}
      onClick={() => {
        props.onClick();
      }}
      style={props.disabled ? props.btnDisableStyle : props.style}
    >
      {props.label}
      {/* {this.returnChildren(label, children)} */}
    </Button>
  );
}

export default withStyles(styleSheet)(MyButton);
