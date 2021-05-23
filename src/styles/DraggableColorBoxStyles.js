const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    cursor: "pointer",
    marginBottom: "-6px",
    position: "relative",
    zIndex: "1",
    "&:hover svg": {
      transform: "scale(1.3)",
      color: "white",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "0",
    padding: "10px",
    color: "rgba(0,0,0,0.6)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "0.9rem",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    transition: "0.2s all ease-in-out",
  },
};

export default styles;
