import "./App.css";
import Palette from "./Palette.jsx";
import seedColors from "./seedColors";

function App() {
  return (
    <div className="App">
      <Palette {...seedColors[2]} />
    </div>
  );
}

export default App;
