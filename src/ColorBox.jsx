import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, withRouter } from "react-router-dom";
import "./ColorBox.css";

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
    let { name, background } = this.props;
    let { copied } = this.state;
    return (
      <div
        className={`ColorBox ${copied && "show"}`}
        style={{ background: background }}
      >
        <div
          style={{ background: background }}
          className={`copy-overlay ${copied && "show"}`}
          onClick={(e) => e.stopPropagation()}
        />
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>copied!</h1>
          <br />
          <span>
            <span style={{ textTransform: "uppercase" }}>{name}</span> :{" "}
            {background}
          </span>
        </div>
        <div className="copy-container" onClick={this.handleClick}>
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">More...</button>
        </div>
        <CopyToClipboard text={background} onCopy={this.changeCopyState}>
          <span className="see-more">Copy</span>
        </CopyToClipboard>
      </div>
    );
  }
}

export default withRouter(ColorBox);
