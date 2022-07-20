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
      >
        {props.text}
        <input
          type="file"
          accept="*"
          hidden
          onChange={(e) => {
            props.onUpload(e);
          }}
        />
      </Button>
      <Box className={classes.uploaded__file}>{props.file}</Box>
    </div>
  );
}

export default withStyles(styleSheet)(FileChooser);
