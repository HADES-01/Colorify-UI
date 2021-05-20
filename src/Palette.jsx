import { React, Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";

import "./Palette.css";
class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeLevel(level) {
    this.setState({ level: level });
  }
  changeFormat(format) {
    this.setState({ format: format });
  }
  render() {
    let { colors } = this.props.palette;
    let { level, format } = this.state;
    let colorBoxes = colors[this.state.level].map((color) => (
      <ColorBox background={color[format]} name={color.name} key={color.name} />
    ));
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default Palette;
