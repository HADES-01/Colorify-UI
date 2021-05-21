import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./SingleColorPalette.css";

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
    const { paletteName, emoji } = this.props.palette;
    const { format } = this.state;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        background={color[format]}
        key={color.name}
        name={color.name}
        showLink={false}
      />
    ));
    return (
      <div className="SingleColorPalette">
        <Navbar showLevel={false} handleChange={this.changeFormat} />
        <div className="Palette-colors">{colorBoxes}</div>
        <footer className="Palette-footer">
          <span>{paletteName}</span>
          <span>{emoji}</span>
        </footer>
      </div>
    );
  }
}

export default SingleColorPalette;
