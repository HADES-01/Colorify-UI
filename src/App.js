import React, { useEffect, useState } from "react";
import Palette from "./Palette.jsx";
import seedColors from "./seedColors";
import { Switch, Route } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from "./Helpers";

function App() {
  const localPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(localPalettes || seedColors);
  syncLocalStorage();

  function findPalette(id) {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  function removePalette(paletteId) {
    const newPalettes = palettes.filter(({ id }) => id !== paletteId);
    setPalettes(newPalettes);
  }

  function savePalette(newPalette) {
    setPalettes([...palettes, newPalette]);
  }
  useEffect(syncLocalStorage);

  function syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              {...routeProps}
              color={routeProps.match.params.colorId}
              palette={generatePalette(
                findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList
              {...routeProps}
              palettes={palettes}
              removePalette={removePalette}
            />
          )}
        />
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm
              {...routeProps}
              savePalette={savePalette}
              palettes={palettes}
            />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(findPalette(routeProps.match.params.id))}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
