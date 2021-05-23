import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false, newPaletteName: "" };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handlePaletteName = this.handlePaletteName.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
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
    const { open, newPaletteName } = this.state;
    const { handleClickOpen, handleClose } = this;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>

            <ValidatorForm
              onSubmit={this.handleSubmit}
              style={{
                display: "flex",
                height: "64px",
                alignItems: "center",
              }}
            >
              <TextValidator
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["This is required", "Name is Already in Use"]}
                value={newPaletteName}
                label="Palette Name"
                onChange={this.handlePaletteName}
              />

              <Button type="submit" variant="contained" color="primary">
                Save Palette
              </Button>
            </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
