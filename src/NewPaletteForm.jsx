import React from "react";
import clsx from "clsx";
import useStyles from "./styles/NewPaletteFormStyles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DrggableColorBox from "./DraggableColorBox";
import { ChromePicker } from "react-color";
import DraggableColorBox from "./DraggableColorBox";

export default function NewPaletteForm() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [color, setColor] = React.useState("red");
  const [colors, setColors] = React.useState(["red", "#e23456"]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const addColor = (color) => {
    setColors([...colors, color]);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
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
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button variant="contained" color="secondary">
            Create
          </Button>
          <Button variant="contained" color="secondary">
            Random
          </Button>
        </div>
        <ChromePicker color={color} onChange={handleColorChange} />
        <Button
          variant="contained"
          style={{ backgroundColor: color }}
          onClick={() => addColor(color)}
        >
          Add Color
        </Button>
      </Drawer>
      <main
        style={{ padding: "none", margin: "none" }}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {colors.map((col) => (
          <DraggableColorBox color={col} />
        ))}
      </main>
    </div>
  );
}
