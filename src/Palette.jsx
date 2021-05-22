import { React, Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import { withStyles } from "@material-ui/styles";
import PaletteFooter from "./PaletteFooter";
import "./Palette.css";

const styles = {
  main: {
    overflow: "hidden",
    height: "100vh",
  },
  colors: {
    height: "85%",
  },
};

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
    const { classes } = this.props;
    let { colors, paletteName, emoji, id } = this.props.palette;
    let { level, format } = this.state;
    let colorBoxes = colors[this.state.level].map((color) => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
        showFullPalette={true}
      />
    ));
    return (
      <div className={classes.main}>
        <Navbar
          showLevel={true}
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        <div className={classes.colors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
