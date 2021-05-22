import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorBoxList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((col, i) => (
        <DraggableColorBox
          index={i}
          color={col}
          key={col.name}
          handleClick={removeColor}
        />
      ))}
    </div>
  );
});

export default DraggableColorBoxList;
