import "./App.css";
import Palette from "./Palette.jsx";
import seedColors from "./seedColors";
import { Switch, Route } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import { generatePalette } from "./Helpers";

function App() {
  const findPalette = (id) => {
    return seedColors.find(function (palette) {
      return palette.id === id;
    });
  };
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
            <PaletteList {...routeProps} palettes={seedColors} />
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
