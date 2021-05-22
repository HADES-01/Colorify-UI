const styles = {
  main: {
    display: "flex",
    height: "7.5%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "22px",
    background: "#eceff1",
    fontFamily: "Roboto",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logoLink: {
    textDecoration: "none",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  slider: {
    width: "340px",
    margin: "0 10px",
    display: "inline-block",
    "& .rc-slider-rail": {
      height: "8px",
    },
    "& .rc-slider-track": {
      backgroundColor: "transparent",
    },
    "& .rc-slider-handle, .rc-slider-handle:hover,.rc-slider-handle:active,.rc-slider-handle:focus":
      {
        backgroundColor: "green",
        outline: "none",
        border: "2px solid green",
        boxShadow: "none",
        height: "18px",
        width: "18px",
      },
  },
  selectContainer: {
    marginLeft: "auto",
    marginRight: "1rem",
  },
};

export default styles;
