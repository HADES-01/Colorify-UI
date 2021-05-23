import React, { useState, useEffect } from "react";
import clsx from "clsx";
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
import useStyles from "./styles/NewPaletteFormStyles";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorBoxList from "./DraggableColorBoxList";
import { arrayMove } from "react-sortable-hoc";

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("#ff0000");
  const [colors, setColors] = useState(props.palettes[0].colors);
  const [colorName, setColorName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");

  const maxColors = 20;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
  };

  const handlePaletteName = (e) => {
    setNewPaletteName(e.target.value);
  };

  const removeColor = (newName) => {
    let newColors = colors.filter(({ name }) => name !== newName);
    setColors(newColors);
  };

  const handleSubmit = () => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const addColor = () => {
    const newColor = {
      color: currentColor,
      name: colorName,
    };
    setColors([...colors, newColor]);
    setColorName("");
    setCurrentColor("#ffffff");
  };

  const clearPalette = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    let allColors = props.palettes.map(({ colors }) => colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    let randColor = allColors[rand];
    setColors([...colors, randColor]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newColors = arrayMove(colors, oldIndex, newIndex);
    setColors(newColors);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      colors.every(({ color }) => color !== currentColor)
    );
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      props.palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== newPaletteName.toLowerCase()
      )
    );
  });
  const handleChange = (e) => {
    setColorName(e.target.value);
  };
  const paletteFull = maxColors <= colors.length;
  return (
    <div className={classes.root}>
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
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["This is required", "Name is Already in Use"]}
              value={newPaletteName}
              label="Palette Name"
              onChange={handlePaletteName}
            />
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </ValidatorForm>
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
          <Button variant="contained" color="secondary" onClick={clearPalette}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={addRandomColor}
            disabled={paletteFull}
          >
            Random
          </Button>
        </div>
        <ChromePicker color={currentColor} onChange={handleColorChange} />
        <ValidatorForm onSubmit={addColor}>
          <TextValidator
            value={colorName}
            onChange={handleChange}
            label={"Color Name"}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "This field is Required",
              "Color Name already exists",
              "Color is not unique",
            ]}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: paletteFull ? "grey" : currentColor }}
            type="submit"
            disabled={paletteFull}
          >
            {paletteFull ? "Palette Is Full" : "Add Color"}
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
        <DraggableColorBoxList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}
