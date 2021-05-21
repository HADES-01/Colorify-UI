import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./SingleColorPalette.css";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.color);
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
  render() {
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        background={color.hex}
        key={color.name}
        name={color.name}
        showLink={false}
      />
    ));
    return (
      <div className="SingleColorPalette">
        <Navbar
          // level={level}
          // changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default SingleColorPalette;
