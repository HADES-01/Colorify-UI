import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteFooterStyles";

function PaletteFooter(props) {
  return (
    <footer className={props.classes.main}>
      <span>{props.paletteName}</span>
      <span className={props.classes.emoji}>{props.emoji}</span>
    </footer>
  );
}

export default withStyles(styles)(PaletteFooter);
