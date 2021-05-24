import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = { newPaletteName: "", stage: "form" };
    this.handlePaletteName = this.handlePaletteName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
  }
  handlePaletteName(e) {
    this.setState({ newPaletteName: e.target.value });
  }
  showEmojiPicker() {
    this.setState({ stage: "emoji" });
  }
  handleSubmit(emoji) {
    this.props.handleSubmit(this.state.newPaletteName, emoji.native);
    this.setState({ stage: "" });
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
    const { handleFormClose } = this.props;
    return (
      <div>
        <Dialog open={this.state.stage === "emoji"} onClose={handleFormClose}>
          <Picker
            onSelect={this.handleSubmit}
            title={"Choose a Palette Emoji"}
          />
        </Dialog>
        <Dialog
          open={this.state.stage === "form"}
          onClose={handleFormClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose A Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Enter your Beautiful Palette's Name. Make Sure it is unique like
                You!!!
              </DialogContentText>

              <TextValidator
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["This is required", "Name is Already in Use"]}
                value={newPaletteName}
                label="Palette Name"
                onChange={this.handlePaletteName}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Save Palette
              </Button>
              <Button
                onClick={handleFormClose}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
