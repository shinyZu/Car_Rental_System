import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style.js";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box } from "@mui/material";

function FileChooser(props) {
  const { classes } = props;

  return (
    <div className={classes.upload__section}>
      <Button
        component="label"
        variant="outlined"
        startIcon={<UploadFileIcon />}
        // sx={{ marginRight: "1rem" }}
        className={classes.upload__btn}
        style={props.style}
      >
        {props.text}
        <input
          type="file"
          accept="*"
          hidden
          multiple={props.multiple}
          onChange={(e) => {
            props.onUpload(e);
          }}
        />
      </Button>
      {!props.displayFileName ? null : (
        <Box
          style={{ display: props.displayFileName }}
          className={classes.uploaded__file}
        >
          {props.file}
        </Box>
      )}
    </div>
  );
}

export default withStyles(styleSheet)(FileChooser);
