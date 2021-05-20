import { React, Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ColorBox from "./ColorBox";

import "./Palette.css";
class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
    this.changeLevel = this.changeLevel.bind(this);
  }
  changeLevel(level) {
    this.setState({ level: level });
  }
  render() {
    let { colors } = this.props.palette;
    let { level } = this.state;
    let colorBoxes = colors[this.state.level].map((color) => (
      <ColorBox background={color.hex} name={color.name} key={color.name} />
    ));
    return (
      <div className="Palette">
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
          />
        </div>
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default Palette;
