import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
// import Controls from "./controls/Controls";
// import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import HelpIcon from "@mui/icons-material/Help";
import Button from "../Button/Button";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: "150px",
    borderRadius: "20px",
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    // backgroundColor: theme.palette.secondary.light,
    color: "#2c4ea9",
    "&:hover": {
      backgroundColor: "#2c4ea9",
      color: "#fff",
      cursor: "default",
      padding: "0",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <HelpIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button
          label="No"
          style={{
            backgroundColor: "#ccc",
            color: "#fff",
          }}
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Button
          label="Yes"
          style={{
            backgroundColor: "#2c4ea9",
            color: "#fff",
          }}
          onClick={confirmDialog.onConfirm}
        />
        {/* <Controls.Button
          text="No"
          color="default"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        /> */}
        {/* <Controls.Button
          text="Yes"
          color="secondary"
          onClick={confirmDialog.onConfirm}
        /> */}
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
