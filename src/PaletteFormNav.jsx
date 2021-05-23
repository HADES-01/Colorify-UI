import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import PaletteMetaForm from "./PaletteMetaForm";
const drawerWidth = 350;
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    // height: "64px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  navBtns: {
    marginRight: "1rem",
  },
  button: {
    margin: "0 0.55rem",
  },
  link: {
    textDecoration: "none",
  },
});

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
    };
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }
  handleFormOpen() {
    this.setState({ formOpen: true });
  }
  handleFormClose() {
    this.setState({ formOpen: false });
  }

  render() {
    const { classes, open, handleDrawerOpen, palettes, handleSubmit } =
      this.props;
    const { formOpen } = this.state;
    return (
      <div>
        <CssBaseline />
        <AppBar
          color="default"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              onClick={this.handleFormOpen}
            >
              Create Palette
            </Button>
            <Link to="/" className={classes.link}>
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
              >
                Go Back
              </Button>
            </Link>
          </div>
        </AppBar>
        {formOpen && (
          <PaletteMetaForm
            palettes={palettes}
            handleSubmit={handleSubmit}
            handleFormClose={this.handleFormClose}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(PaletteFormNav);
