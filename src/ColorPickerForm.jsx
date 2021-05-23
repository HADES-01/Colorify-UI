import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import styles from "./styles/ColorPickerFormStyles";

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);

    this.state = { currentColor: "#fff000", colorName: "" };
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  handleColorChange(e) {
    this.setState({ currentColor: e.hex });
  }

  handleNameChange(e) {
    this.setState({ colorName: e.target.value });
  }

  handleSubmit() {
    this.props.addColor({
      color: this.state.currentColor,
      name: this.state.colorName,
    });
    this.setState({ colorName: "", currentColor: "#5f5f5f" });
  }

  render() {
    const { paletteFull, classes } = this.props;
    const { currentColor, colorName } = this.state;
    return (
      <div className={classes.root}>
        <ChromePicker
          className={classes.picker}
          color={currentColor}
          onChange={this.handleColorChange}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            className={classes.colorNameInput}
            value={colorName}
            onChange={this.handleNameChange}
            label={"Color Name"}
            variant="filled"
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "This field is Required",
              "Color Name already exists",
              "Color is not unique",
            ]}
          />
          <Button
            className={classes.addColor}
            variant="contained"
            style={{ backgroundColor: paletteFull ? "grey" : currentColor }}
            type="submit"
            disabled={paletteFull}
          >
            {paletteFull ? "Palette Is Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
