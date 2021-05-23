import PaletteStyles from "./PaletteStyles";
import sizes from "./sizes";

const styles = {
  ...PaletteStyles,
  box: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    background: "black",
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
        opacity: (props) => (props.showFullPalette ? "1" : "0.6"),
      },
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "33%",
    },
    [sizes.down("sm")]: {
      width: "50%",
      height: "20%",
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%",
    },
  },
  seeMore: {
    width: (props) => (props.showFullPalette ? "0%" : "100%"),
    height: "100%",
    position: "absolute",
    display: "inline-block",
    top: "0",
    left: "50%",
    marginLeft: "-50%",
    zIndex: "2",
    cursor: "pointer",
    border: "none",
    textAlign: "center",
    outline: "none",
    background: "rgba(0, 0, 0, 0.1)",
    fontSize: "2rem",
    color: "white",
    textTransform: "uppercase",
    opacity: (props) => (props.showFullPalette ? "0" : "1"),
    transition: "0.3s ease-in-out",
  },
};

export default styles;
