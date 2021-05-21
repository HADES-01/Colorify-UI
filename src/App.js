import "./App.css";
import Palette from "./Palette.jsx";
import seedColors from "./seedColors";
import { Switch, Route } from "react-router-dom";

import { generatePalette } from "./Helpers";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <h1>Home Route</h1>} />
        <Route
          exact
          path="/palette/:id"
          render={() => <h1>Individual Component</h1>}
        />
      </Switch>
      {/* <Palette palette={generatePalette(seedColors[0])} /> */}
    </div>
  );
}

export default App;
