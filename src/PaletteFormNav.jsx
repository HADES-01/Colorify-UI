import React, { PureComponent } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class PaletteFormNav extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newPaletteName: "",
    };
    this.handlePaletteName = this.handlePaletteName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePaletteName(e) {
    this.setState({ newPaletteName: e.target.value });
  }

  handleSubmit() {
    this.props.handleSubmit(this.state.newPaletteName);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== this.state.newPaletteName.toLowerCase()
      )
    );
  }
  render() {
    const { newPaletteName } = this.state;
    const { classes, open, handleDrawerOpen } = this.props;
    return (
      <div>
        <CssBaseline />
        <AppBar
          color="default"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm
              onSubmit={this.handleSubmit}
              style={{ display: "flex", height: "64px", alignItems: "center" }}
            >
              <TextValidator
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["This is required", "Name is Already in Use"]}
                value={newPaletteName}
                label="Palette Name"
                onChange={this.handlePaletteName}
              />
              <div>
                <Button type="submit" variant="contained" color="primary">
                  Save Palette
                </Button>
              </div>
            </ValidatorForm>
            <Link to="/">
              <Button variant="contained" color="primary">
                Go Back
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default PaletteFormNav;
