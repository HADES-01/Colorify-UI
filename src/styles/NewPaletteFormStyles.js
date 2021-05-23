import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 350;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center",
  },
  drawerHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  close: {
    justifySelf: "flex-start",
    "& svg": {
      fontSize: "2.5rem",
    },
  },
  content: {
    height: "calc(100vh - 64px)",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: "90%",
    display: "Flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    width: "47%",
  },
}));

export default useStyles;
