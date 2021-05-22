const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    overflow: "auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "60%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flesxWrap: "wrap",
  },
  nav: {
    display: "flex",
    width: "100%",
    color: "white",
    justifyContent: "space-between",
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "5%",
  },
};

export default styles;
