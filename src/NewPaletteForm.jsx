import React, { useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PaletteFormNav from "./PaletteFormNav";
import useStyles from "./styles/NewPaletteFormStyles";
import DraggableColorBoxList from "./DraggableColorBoxList";
import { arrayMove } from "react-sortable-hoc";
import ColorPickerForm from "./ColorPickerForm";

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(props.palettes[0].colors);

  const maxColors = 20;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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

  const addColor = (newColor) => {
    setColors([...colors, newColor]);
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
  const paletteFull = maxColors <= colors.length;
  return (
    <div className={classes.root}>
      <PaletteFormNav
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
        open={open}
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
          <IconButton onClick={handleDrawerClose} className={classes.close}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h4">Palette Creator</Typography>
        </div>
        <Divider />
        <div className={classes.container}>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={clearPalette}
            >
              Clear Palette
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={addRandomColor}
              disabled={paletteFull}
            >
              Random
            </Button>
          </div>
          <ColorPickerForm
            paletteFull={paletteFull}
            addColor={addColor}
            colors={colors}
          />
        </div>
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
