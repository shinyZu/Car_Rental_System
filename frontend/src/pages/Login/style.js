export const styleSheet = {
  login__overlay: {
    // border: "2px solid red",
    backgroundColor: " rgba(0, 0, 0, 0.2)",
  },

  login__container: {
    // border: "2px solid green",
    maxWidth: "750px",
    maxHeight: "450px",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "10px",
    right: "0",
    bottom: "0",
    left: "0",
    margin: "auto",
    // transform: "translate(-50%, -50%)",
    display: "flex",
    backgroundColor: "#ffffff",
    boxShadow: "0px 0px 18px 0px rgba(0, 0, 0, 0.75)",
    borderRadius: "8px",
  },

  login__left: {
    // border: "2px solid pink",
    opacity: "0.9",
  },

  login__right: {
    // border: "2px solid blue",
    width: "100%",
  },

  login__closeBtn: {
    // border: "2px solid black",
    display: "flex",
    justifyContent: "end",
    paddingRight: "10px",
    "&:hover": {
      cursor: "pointer",
    },
  },

  login__title: {
    // border: "2px solid red",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // color: "#95a5a6",
    color: "#4169a9",
  },

  login__icon: {
    fontSize: "80px !important",
    color: "#4169a9 !important",
  },

  login__content: {
    // border: "2px solid orange",
    padding: "10px 25px",
    // marginTop: "10%",
  },

  login_btn_container: {
    // border: "2px solid blue",
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },

  btn__login: {
    // backgroundColor: "#1abc9c",
    backgroundColor: "#4169a9",
    color: "white",
    padding: "15px",
    width: "87%",
    borderRadius: "5px",
    border: "none",
    "&:hover": {
      cursor: "pointer",
      // backgroundColor: "#16a085",
      backgroundColor: "#37527e",
    },
  },

  login__footer: {
    // border: "2px solid blue",
    display: "flex",
    justifyContent: "center",
    padding: "0px",
    fontSize: "14px",
  },

  font__family: {
    fontFamily: '"Acme", sans-serif !important',
  },
};
