import React from "react";
import { withStyles } from "@material-ui/styles";
import { SortableElement } from "react-sortable-hoc";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/DraggableColorBoxStyles";

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
