import React from "react";
import TextField from "@mui/material/TextField";

function MyTextField(props) {
  return (
    <TextField
      //   autoFocus
      required={true}
      margin="dense"
      id={props.id}
      label={props.label}
      type={props.type}
      fullWidth
      variant="outlined"
      size="small"
      style={props.style}
    />
  );
}

export default MyTextField;
