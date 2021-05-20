import "./App.css";
import Palette from "./Palette.jsx";
import seedColors from "./seedColors";

import { generatePalette } from "./Helpers";

function App() {
  console.log(generatePalette(seedColors[2]));
  return (
    <div className="App">
      <Palette {...seedColors[2]} />
    </div>
  );
}

export default App;
