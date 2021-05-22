import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  main: {
    backgroundColor: "white",
    height: "7.5vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    fontWeight: "bold",
  },
  emoji: {
    fontSize: "1.5rem",
    margin: "1.5rem",
  },
};

function PaletteFooter(props) {
  return (
    <footer className={props.classes.main}>
      <span>{props.paletteName}</span>
      <span className={props.classes.emoji}>{props.emoji}</span>
    </footer>
  );
}

export default withStyles(styles)(PaletteFooter);
