import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import styles from "./styles/PaletteListStyles";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deleteId: "",
    };
    this.goToPalette = this.goToPalette.bind(this);
    this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleDeleteDialog(val, id) {
    this.setState({ openDeleteDialog: val, deleteId: id });
  }

  handleDelete() {
    this.props.removePalette(this.state.deleteId);
    this.toggleDeleteDialog(false, "");
  }

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes, removePalette } = this.props;
    const { openDeleteDialog, deleteId } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <h1>
              <Link to="/palette/new">Create Palette</Link>
            </h1>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map((p) => (
              <CSSTransition key={p.id} classNames="fade" timeout={500}>
                <MiniPalette
                  // removePalette={removePalette}
                  {...p}
                  handleClick={() => this.goToPalette(p.id)}
                  toggleDialog={this.toggleDeleteDialog}
                  key={p.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          onClose={() => this.toggleDeleteDialog(false, "")}
        >
          <DialogTitle>Are you sure ?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[300] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItem>
            <ListItem button onClick={() => this.toggleDeleteDialog(false, "")}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[300] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
