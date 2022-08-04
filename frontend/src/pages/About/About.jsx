import React from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import Avatar from "../../components/Avatar/Avatar";

function About(props) {
  const { classes } = props;
  return (
    <div id="about" className={classes.about__bg}>
      <div className={classes.section__title}>
        <h1>About Us</h1>
      </div>
      <Avatar page="about" />
      <div>
        <p className={classes.about_div}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          neque labore, repellendus minima quaerat sapiente eum nobis fugit
          doloremque cum distinctio nesciunt, laboriosam quasi. Mollitia
          cupiditate itaque ratione alias placeat.Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Quibusdam neque labore, repellendus
          minima quaerat sapiente eum nobis fugit doloremque cum distinctio
          nesciunt, laboriosam quasi. Mollitia cupiditate itaque ratione alias
          placeat.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Quibusdam neque labore, repellendus minima quaerat sapiente eum nobis
          fugit doloremque cum distinctio nesciunt, laboriosam quasi. Mollitia
          cupiditate itaque ratione alias placeat.Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Quibusdam neque labore, repellendus
          minima quaerat sapiente eum nobis fugit doloremque cum distinctio
          nesciunt, laboriosam quasi. Mollitia cupiditate itaque ratione alias
          placeat.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Quibusdam neque labore, repellendus minima quaerat sapiente eum nobis
          fugit doloremque cum distinctio nesciunt, laboriosam quasi. Mollitia
          cupiditate itaque ratione alias placeat.Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Quibusdam neque labore, repellendus
          minima quaerat sapiente eum nobis fugit doloremque cum distinctio
          nesciunt, laboriosam quasi. Mollitia cupiditate itaque ratione alias
          placeat.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          {/* Quibusdam neque labore, repellendus minima quaerat sapiente eum nobis
          fugit doloremque cum distinctio nesciunt, laboriosam quasi. Mollitia
          cupiditate itaque ratione alias placeat.Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Quibusdam neque labore, repellendus
          minima quaerat sapiente eum nobis fugit doloremque cum distinctio
          nesciunt, laboriosam quasi. Mollitia cupiditate itaque ratione alias
          placeat.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Quibusdam neque labore, repellendus minima quaerat sapiente eum nobis
          fugit doloremque cum distinctio nesciunt, laboriosam quasi. Mollitia
          cupiditate itaque ratione alias placeat.Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Quibusdam neque labore, repellendus
          minima quaerat sapiente eum nobis fugit doloremque cum distinctio
          nesciunt, laboriosam quasi. Mollitia cupiditate itaque ratione alias
          placeat.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Quibusdam neque labore, repellendus minima quaerat sapiente eum nobis
          fugit doloremque cum distinctio nesciunt, laboriosam quasi. Mollitia
          cupiditate itaque ratione alias placeat.Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Quibusdam neque labore, repellendus
          minima quaerat sapiente eum nobis fugit doloremque cum distinctio
          nesciunt, laboriosam quasi. Mollitia cupiditate itaque ratione alias
          placeat. */}
        </p>
      </div>
    </div>
  );
}

export default withStyles(styleSheet)(About);
