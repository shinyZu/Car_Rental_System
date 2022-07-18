export const styleSheet = {
  nav__bar: {
    // border: "2px solid red",
    // backgroundColor: "#205a76",
    background: "linear-gradient(280deg,#205a76,#2980b9)",
    padding: "10px 0px",
    // boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
    boxShadow: "9px 6px 14px 4px rgb(7 12 8 / 49%) !important",
    display: "flex",
    flexDirection: "row",
    color: "white",
    position: "sticky",
    top: "0",
    width: "100%",
    transitionProperty: "top",
    transitionDuration: "2s",
    zIndex: "3",
  },
  nav__tabs: {
    // border: "2px solid deeppink",
    width: "100%",
  },
  nav_left: {
    // border: "2px solid blue",
    alignItems: "flex-start",
  },
  nav__right: {
    // border: "2px solid green",
    display: "flex",
    marginLeft: "20px",
    justifyContent: "flex-end",
    width: "95%",
  },

  nav__text: {
    color: "white",
    fontWeight: "700 !important",
    fontFamily: '"Acme", sans-serif !important',
    fontSize: "0.975rem !important",
  },
};
