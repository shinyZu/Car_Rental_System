export const styleSheet = {
  register__overlay: {
    // border: "2px solid red",
    backgroundColor: " rgba(0, 0, 0, 0.2)",
  },

  register__container: {
    // border: "2px solid green",
    maxWidth: "1000px",
    maxHeight: "680px",
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
    zIndex: "7",
  },

  register__left: {
    // border: "2px solid pink",
    opacity: "0.9",
    // backgroundImage: 'url("../../assets/images/bg1.jpg")',
  },

  register__right: {
    // border: "2px solid green",
    width: "100%",
    backgroundImage: `url("https://www.transparenttextures.com/patterns/fabric-of-squares.png");`,
    backgroundColor: "#ffffff",
  },

  register__closeBtn: {
    // border: "2px solid black",
    display: "flex",
    justifyContent: "end",
    paddingRight: "10px",
    "&:hover": {
      cursor: "pointer",
    },
  },

  register__title: {
    // border: "2px solid red",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#4169a9",
  },

  register__icon: {
    fontSize: "80px !important",
    color: "#4169a9 !important",
  },

  register__content: {
    // border: "2px solid orange",
    padding: "10px 32px",
    // marginTop: "10%",
  },

  content__sub_container: {
    // border: "2px solid blue",
    display: "flex",
    width: "100%",
  },

  register_btn_container: {
    // border: "2px solid blue",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },

  btn__register: {
    backgroundColor: "#4169a9",
    color: "white",
    padding: "15px",
    width: "87%",
    borderRadius: "5px",
    border: "none",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#37527e",
    },
  },

  register__footer: {
    // border: "2px solid red",
    display: "flex",
    justifyContent: "center",
    padding: "0px",
    fontSize: "14px",
  },

  upload__section: {
    // border: "2px solid red",
    display: "flex",
  },

  upload__btn: {
    // border: "2px solid red !important",
    backgroundColor: "#95a5a6 !important",
    color: "black !important",
    fontFamily: '"Acme", sans-serif !important',
    margin: "5px 0px !important",
    border: "none !important",
    "&:hover": {
      //   cursor: "pointer",
      backgroundColor: "#7f8c8d !important",
    },
  },

  uploaded__file: {
    // border: "2px solid blue !important",
    width: "50%",
    height: "30px",
    marginTop: "15px",
    marginLeft: "5px",
  },

  font__family: {
    fontFamily: '"Acme", sans-serif !important',
  },
};
