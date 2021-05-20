import "./App.css";
import Palette from "./Palette.jsx";
import seedColors from "./seedColors";

import { generatePalette } from "./Helpers";

function App() {
  return (
    <div className="App">
      <Palette palette={generatePalette(seedColors[2])} />
    </div>
  );
}

export default App;
