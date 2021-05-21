import React from "react";

export default function footer(props) {
  return (
    <footer className="Palette-footer">
      <span>{props.paletteName}</span>
      <span>{props.emoji}</span>
    </footer>
  );
}
