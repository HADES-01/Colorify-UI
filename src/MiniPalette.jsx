import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";

class MiniPalette extends Component {
  constructor(props) {
    super(props);
    this.toggleDialog = this.toggleDialog.bind(this);
  }
  toggleDialog(e) {
    e.stopPropagation();
    this.props.toggleDialog(true, this.props.id);
  }
  render() {
    const { classes, paletteName, emoji, colors, handleClick } = this.props;
    const miniColorBoxes = colors.map((color) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));
    return (
      <div className={classes.main} onClick={handleClick}>
        <div className={classes.delete} onClick={this.toggleDialog}>
          <DeleteIcon className={classes.deleteIcon} />
        </div>
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
