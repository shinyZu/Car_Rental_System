import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import sample_img from "../../assets/images/car.png";

function MyCard(props) {
  const { classes } = props;

  // function handleCardOnClick() {
  //   console.log("clicked on a car");
  //   // setCarInfoVisible(true);
  // }

  return (
    <div>
      <Card sx={{ maxWidth: 350 }} className={classes.card}>
        <CardActionArea className={classes.card__action__area}>
          <div className={classes.card__img}>
            <CardMedia
              component="img"
              height="240"
              image={sample_img}
              alt="green iguana"
              onClick={(e) => {
                props.onCardClick(e);
              }}
            />
          </div>

          {/* <CardMedia icon={<PersonIcon />} /> */}
          <CardContent className={classes.card__content}>
            <Typography
              className={classes.card__text}
              variant="h6"
              component="div"
            >
              {props.brand}
            </Typography>
            <Typography
              className={(classes.card__text, classes.price__extraKM)}
              variant="h5"
            >
              LKR {props.extra_KM}
              <sup style={{ fontSize: "15px" }}> per extra KM</sup>
            </Typography>
            <Typography className={classes.card__text} variant="h7">
              Passengers : {props.passengers}
            </Typography>
            <Typography className={classes.card__text} variant="h7">
              {props.transmission}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default withStyles(styleSheet)(MyCard);
