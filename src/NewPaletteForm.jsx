import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PaletteFormNav from "./PaletteFormNav";
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

  const removeColor = (newName) => {
    let newColors = colors.filter(({ name }) => name !== newName);
    setColors(newColors);
  };

  const handleSubmit = (name) => {
    const newPalette = {
      paletteName: name,
      id: name.toLowerCase().replace(/ /g, "-"),
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
  });
  const handleChange = (e) => {
    setColorName(e.target.value);
  };
  const paletteFull = maxColors <= colors.length;
  return (
    <div className={classes.root}>
      <PaletteFormNav
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
        open={open}
        classes={classes}
        palettes={props.palettes}
      />
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
