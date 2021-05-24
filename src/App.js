import React, { useEffect, useState } from "react";
import Palette from "./Palette.jsx";
import seedColors from "./seedColors";
import { Switch, Route } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { generatePalette } from "./Helpers";
import "./App.css";
import Page from "./Page";

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
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames={"fade"} timeout={500} key={location.key}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={(routeProps) => (
                    <Page>
                      <SingleColorPalette
                        {...routeProps}
                        color={routeProps.match.params.colorId}
                        palette={generatePalette(
                          findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={(routeProps) => (
                    <Page>
                      <PaletteList
                        {...routeProps}
                        palettes={palettes}
                        removePalette={removePalette}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/new"
                  render={(routeProps) => (
                    <Page>
                      <NewPaletteForm
                        {...routeProps}
                        savePalette={savePalette}
                        palettes={palettes}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={(routeProps) => (
                    <Page>
                      <Palette
                        palette={generatePalette(
                          findPalette(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
}

export default App;
