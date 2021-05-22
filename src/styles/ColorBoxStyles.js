import chroma from "chroma-js";
const styles = {
  main: {
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
        visibility: "visible",
        transform: "scaleX(1)",
        zIndex: "2",
        opacity: (props) => (props.showFullPalette ? "1" : "0.6"),
      },
    },
  },
  showMain: {
    pointerEvents: "none",
    transform: "none",
  },
  copyText: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.35 ? "white" : "black",
  },
  seeMore: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "inline-block",
    top: "0",
    left: "50%",
    marginLeft: "-50%",
    zIndex: "-1",
    cursor: "pointer",
    border: "none",
    visibility: "hidden",
    textAlign: "center",
    outline: "none",
    background: "rgba(0, 0, 0, 0.1)",
    fontSize: "1.5rem",
    color: (props) =>
      chroma(props.background).luminance() <= 0.35 ? "white" : "black",
    textTransform: "uppercase",
    transform: "scaleX(0)",
    opacity: (props) => (props.showFullPalette ? "0" : "1"),
    transition: "0.2s all ease-in-out",
  },
  boxContent: {
    textAlign: "left",
    position: "absolute",
    padding: "10px",
    left: "0px",
    bottom: "0px",
    fontSize: "0.8rem",
    letterSpacing: "1px",
    zIndex: "4",
    textTransform: "uppercase",
  },
  copyButton: {
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0",
    bottom: "0",
    zIndex: "2",
    letterSpacing: "1px",
    color: "white",
    width: "50px",
    height: "50px",
    textAlign: "center",
    fontWeight: "600",
    lineHeight: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
    transition: "0.3s all ease-in",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.5)",
      color: "white",
    },
  },
  copyOverlay: {
    opacity: "1",
    width: "100%",
    height: "100%",
    transition: "0.3s ease-out 0.2s",
    transform: "scale(0)",
    zIndex: "20",
    position: "absolute",
  },
  overlayShow: {
    opacity: "1",
    transition: "0.3s transform ease-in",
    transform: "scaleX(10) scaleY(10)",
  },
  copyMsg: {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    opacity: "0",
    zIndex: "-1",
    color: "white",
    fontSize: "3rem",
    transform: "scale(0)",
    "& h1": {
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontWeight: "400",
      textShadow: "1px 2px rgba(0, 0, 0, 0.6)",
      background: "rgba(255, 255, 255, 0.3)",
    },
    "& span": {
      fontSize: "2rem",
      fontWeight: "100",
      textTransform: "lowercase",
    },
  },
  copyMsgShow: {
    opacity: "1",
    transition: "all 00.5s 0.3s ease-in-out",
    transform: "scale(1)",
    zIndex: "25",
  },
};
export default styles;