import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import chroma from "chroma-js";
import "./ColorBox.css";

const styles = {
  copyText: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.28 ? "white" : "black",
  },
};

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
    this.changeCopyState = this.changeCopyState.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  handleClick() {
    this.props.history.push(this.props.moreUrl);
  }

  render() {
    let { name, background, showLink, classes } = this.props;
    let { copied } = this.state;
    return (
      <div
        className={`ColorBox ${copied && "show"}`}
        style={{
          background: background,
        }}
      >
        <div
          style={{ background: background }}
          className={`copy-overlay ${copied && "show"}`}
          onClick={(e) => e.stopPropagation()}
        />
        <div className={`copy-msg ${copied && "show"} ${classes.copyText}`}>
          <h1>copied!</h1>
          <br />
          <span>
            <span style={{ textTransform: "uppercase" }}>{name}</span> :{" "}
            {background}
          </span>
        </div>
        <div className="copy-container" onClick={this.handleClick}>
          <div className="box-content">
            <span className={classes.copyText}>{name}</span>
          </div>
          {showLink && (
            <button className="copy-button">
              <i className="fas fa-angle-double-right fa-2x"></i>
            </button>
          )}
        </div>
        <CopyToClipboard text={background} onCopy={this.changeCopyState}>
          <span className={`see-more ${classes.copyText}`}>
            <i className="far fa-copy fa-2x"></i>
          </span>
        </CopyToClipboard>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ColorBox));
