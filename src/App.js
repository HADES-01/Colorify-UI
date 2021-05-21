import "./App.css";
import Palette from "./Palette.jsx";
import seedColors from "./seedColors";
import { Switch, Route } from "react-router-dom";

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
        <Route exact path="/" render={() => <h1>Home Route</h1>} />
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
