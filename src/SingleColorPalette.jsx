import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/SingleColorPaletteStyles";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
    };
    this._shades = this.gatherShades(this.props.palette, this.props.color);
    this.changeFormat = this.changeFormat.bind(this);
  }
  gatherShades(palette, colorId) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorId)
      );
    }
    return shades.slice(1);
  }

  changeFormat(format) {
    this.setState({ format: format });
  }

  render() {
    const { classes } = this.props;
    const { paletteName, emoji } = this.props.palette;
    const { format } = this.state;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        background={color[format]}
        key={color.name}
        name={color.name}
        showFullPalette={false}
      />
    ));
    return (
      <div className={classes.main}>
        <Navbar showLevel={false} handleChange={this.changeFormat} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.box}>
            <div onClick={this.props.history.goBack}>
              <button className={`${classes.seeMore} some`}>
                <i className="fas fa-arrow-circle-left"></i>
              </button>
            </div>
          </div>
        </div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
