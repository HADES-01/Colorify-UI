import React from "react";
import { withStyles } from "@material-ui/styles";
import { SortableElement } from "react-sortable-hoc";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    cursor: "pointer",
    marginBottom: "-6px",
    position: "relative",
    transition: "0.2s transform ease-in-out",
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
    fontSize: "1.1rem",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    transition: "0.2s all ease-in-out",
  },
};

const DraggableColorBox = SortableElement((props) => {
  return (
    <div
      className={props.classes.root}
      style={{ backgroundColor: props.color.color }}
    >
      <div className={props.classes.boxContent}>
        <span>{props.color.name}</span>
        <DeleteIcon
          className={props.classes.deleteIcon}
          onClick={() => props.handleClick(props.color.name)}
        />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
