import React, { Component } from "react";
import MiniPalette from "./MiniPalette";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { palettes } = this.props;
    return (
      <div className="PaletteList">
        <h1>React Colors</h1>
        {palettes.map((p) => (
          <MiniPalette {...p} />
        ))}
      </div>
    );
  }
}

export default PaletteList;
