import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorBoxStyles";

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
    let { name, background, showFullPalette, classes } = this.props;
    let { copied } = this.state;
    return (
      <div
        className={`${classes.main} ${copied && classes.showMain}`}
        style={{
          background: background,
        }}
      >
        <div
          style={{ background: background }}
          className={`${classes.copyOverlay} ${copied && classes.overlayShow}`}
          onClick={(e) => e.stopPropagation()}
        />
        <div
          className={`${classes.copyMsg} ${copied && classes.copyMsgShow} ${
            classes.copyText
          }`}
        >
          <h1>copied!</h1>
          <br />
          <span>
            <span style={{ textTransform: "uppercase" }}>{name}</span> :{" "}
            {background}
          </span>
        </div>
        <div onClick={this.handleClick}>
          <div className={classes.boxContent}>
            <span className={classes.copyText}>{name}</span>
          </div>
          {showFullPalette && (
            <button className={`${classes.seeMore} some`}>
              {"    "}
              <i className="fas fa-angle-double-right"></i>
            </button>
          )}
        </div>
        <CopyToClipboard text={background} onCopy={this.changeCopyState}>
          <span className={`${classes.copyButton} ${classes.copyText}`}>
            <i className="far fa-copy"></i>
          </span>
        </CopyToClipboard>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ColorBox));
