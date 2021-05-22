import React, { useState, useEffect } from "react";
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
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorBox from "./DraggableColorBox";

export default function NewPaletteForm() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [color, setColor] = useState("red");
  const [colors, setColors] = useState([]);
  const [colorName, setColorName] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const addColor = () => {
    const newColor = {
      value: color,
      name: colorName,
    };
    setColors([...colors, newColor]);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      colors.every(({ value }) => value !== color)
    );
  });
  const handleChange = (e) => {
    setColorName(e.target.value);
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
        <ValidatorForm onSubmit={addColor}>
          <TextValidator
            value={colorName}
            onChange={handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "This field is Required",
              "Color Name already exists",
              "Color is not unique",
            ]}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: color }}
            type="submit"
          >
            Add Color
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        style={{ padding: "0" }}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {colors.map((col) => (
          <DraggableColorBox color={col.value} />
        ))}
      </main>
    </div>
  );
}
