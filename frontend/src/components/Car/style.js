export const styleSheet = {
  reserve__container: {
    // border: "2px solid green",
    maxWidth: "50vw",
    maxHeight: "70vh",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "55px",
    right: "0",
    bottom: "0",
    left: "0",
    margin: "auto",
    // transform: "translate(-50%, -50%)",
    display: "flex",
    boxShadow: "0px 0px 18px 0px rgba(0, 0, 0, 0.75)",
    borderRadius: "20px",
    // backgroundImage: `url("https://www.transparenttextures.com/patterns/dark-geometric.png");`,
    // backgroundColor: "#4169a9",
  },

  container__2: {
    // border: "2px solid blue",
    backgroundColor: "white",
    padding: "18px 30px",
    borderRadius: "10px",
  },

  container__2__txtfield: {
    border: "2px solid red !important",
    "&:focused": {
      cursor: "pointer",
      backgroundColor: "#16a085 !important",
      color: "black !important",
    },
  },

  reserve__btn__cell: {
    // border: "2px solid blue",
    display: "flex",
    justifyContent: "center",
  },

  reserve__btn: {
    border: "1px #1abc9c !important",
    backgroundColor: "#1abc9c !important",
    color: "white !important",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#16a085 !important",
    },
    fontFamily: '"Acme", sans-serif !important',
  },

  reserve__closeBtn: {
    // border: "2px solid black",
    display: "flex",
    justifyContent: "end",
    paddingRight: "10px",
    "&:hover": {
      cursor: "pointer",
    },
  },
};
