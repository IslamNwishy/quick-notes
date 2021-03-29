import React, { Component } from "react";

class InputParser extends Component {
  state = {
    text: "",
  };

  HandleNotes = (string) => {
    var key = string.substring(0, 1).toLowerCase();
    if (this.props.col[key] !== undefined) {
      var note = string.substring(2, string.length).trim();
      this.props.AddNote(key, note);
      return true;
    }
    //Else error
    return false;
  };
  Handlecmd = (string) => {
    var type = string.substring(0, 3);
    var rest = string.substring(5, string.length).trim().split("-");
    if (rest[0] === "") {
      rest = rest.slice(1);
    }
    var key = rest[0].trim().toLowerCase()[0];
    if (rest.length >= 2) var name = rest[1].trim().toLowerCase();
    if (type === "add" && rest.length >= 2) {
      this.props.AddCol(key, name);
      return true;
    } else if (type === "rem") {
      if (this.props.col[key] !== undefined) {
        this.props.remCol(key);
        return true;
      }
    }
    return false;
  };
  SendNote = (e) => {
    e.preventDefault();
    var string = this.state.text.trim();
    var check = string.substring(0, 1);
    var success = false;
    if (check === "\\") {
      success = this.Handlecmd(string.substring(1, string.length).trim());
    } else {
      success = this.HandleNotes(string.trim());
    }
    if (success) this.setState({ text: "" });
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <form className="input-group mt-5" onSubmit={this.SendNote}>
        <input
          type="text"
          autoComplete="off"
          className="form-control"
          id="inputText"
          aria-describedby="button-addon2"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="btn btn-outline-light"
          id="button-addon2"
        >
          Add Note
        </button>
      </form>
    );
  }
}
export default InputParser;
