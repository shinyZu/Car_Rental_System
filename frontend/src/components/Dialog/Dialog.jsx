import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function MyDialog(props) {
  // const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Dialog open={props.open}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.onClose();
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyDialog;
