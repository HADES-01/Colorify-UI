import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import PaletteStyles from "./styles/PaletteStyles";

const styles = {
  ...PaletteStyles,
  box: {
    width: "20%",
    height: (props) => (props.showFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    cursor: "pointer",
    marginBottom: "-4px",
    position: "relative",
    transition: "0.2s transform ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 41px -11px rgba(0, 0, 0, 0.5)",
      zIndex: "5",
      transform: "scale(1.1)",
      "& .some": {
        width: "100%",
        opacity: (props) => (props.showFullPalette ? "1" : "0.6"),
      },
    },
  },
  seeMore: {
    width: (props) => (props.showFullPalette ? "0%" : "100%"),
    height: "100%",
    position: "absolute",
    display: "inline-block",
    top: "0",
    left: "50%",
    marginLeft: "-50%",
    zIndex: "2",
    cursor: "pointer",
    border: "none",
    textAlign: "center",
    outline: "none",
    background: "rgba(0, 0, 0, 0.1)",
    fontSize: "2rem",
    color: "white",
    textTransform: "uppercase",
    opacity: (props) => (props.showFullPalette ? "0" : "1"),
    transition: "0.3s ease-in-out",
  },
};

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
          <div
            className={classes.box}
            style={{ background: "black", height: "50%" }}
          >
            <div onClick={this.props.history.goBack}>
              <button className={`${classes.seeMore} some`}>
                <i className="fas fa-arrow-circle-left fa-4x"></i>
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
