import { hover } from "@testing-library/user-event/dist/hover";

export const styleSheet = {
  card: {
    // border: "2px solid deeppink",
    // border: "2px blur",
    // backgroundColor: "#17878f !important",
    backgroundImage:
      'url("https://www.transparenttextures.com/patterns/soft-wallpaper.png")',
    backdropFilter: "rgba(2, 1, 1, 0.432) !important",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "300px",
    height: "50vh",
    boxShadow: "9px 6px 14px 4px rgb(7 12 8 / 49%) !important",
    borderRadius: "15px !important",
    margin: "30px 30px",
  },

  card__action__area: {
    // border: "2px solid green",
    // backgroundColor: "#95afc0",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
  },

  card__img: {
    // border: "2px solid orange",
    // width: "100%",
    // height: "30vh",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: "30px",
  },

  card__content: {
    // border: "2px solid lightgreen",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0px 30px 0px !important",
    // fontFamily: "Acme !important",
    // lineHeight: "10px !important",
    "&:hover": {
      cursor: "default",
    },
  },

  card__text: {
    // fontWeight: "700 !important",
    fontFamily: '"Acme", sans-serif !important',
  },

  price__extraKM: {
    color: "red",
    fontWeight: "700 !important",
    fontFamily: '"Acme", sans-serif !important',
  },
};
