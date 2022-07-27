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
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
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

  titleIconBlue: {
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

  titleIconGreen: {
    // backgroundColor: theme.palette.secondary.light,
    color: "rgb(26, 188, 156)",
    "&:hover": {
      backgroundColor: "rgb(26, 188, 156)",
      color: "#fff",
      cursor: "default",
      padding: "0",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },

  titleIconRed: {
    // backgroundColor: theme.palette.secondary.light,
    color: "red",
    "&:hover": {
      backgroundColor: "red",
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
        <IconButton
          disableRipple
          /* className={classes.titleIconBlue} */
          className={
            confirmDialog.action == "Delete"
              ? classes.titleIconRed
              : confirmDialog.action == "Save"
              ? classes.titleIconGreen
              : classes.titleIconBlue
          }
        >
          {confirmDialog.action == "Delete" ? <ErrorIcon /> : <HelpIcon />}
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
        {confirmDialog.action2 == "Deny" ? (
          <Button
            label="Deny"
            style={confirmDialog.denyBtnStyle}
            onClick={confirmDialog.onDeny}
          />
        ) : null}
        <Button
          label={confirmDialog.action2 == "Deny" ? "Accept" : "Yes"}
          style={confirmDialog.confirmBtnStyle}
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
