import React, { Component } from "react";

class InputParser extends Component {
  state = {
    text: "",
    error: "",
  };
  HandleNotes = (string) => {
    var key = string.substring(0, 1).toLowerCase();
    if (this.props.col[key] !== undefined) {
      var note = string.substring(2, string.length).trim();
      this.props.AddNote(key, note);
      return true;
    }
    //Else error
    this.setState({
      error:
        'The given key" ' +
        key +
        '" does not exist! Please make sure you are inputing one of the possible keys and try again.',
    });
    return false;
  };
  Handlecmd = (string) => {
    var type = string.substring(0, 3);
    var rest = string.substring(5, string.length).trim().split("-");
    if (rest[0] === "") {
      rest = rest.slice(1);
    }
    // var key = rest[0].trim().toLowerCase()[0];
    // if (rest.length >= 2) var name = rest[1].trim().toLowerCase();
    if (rest.length <= 0) {
      this.setState({
        error:
          'No arguments were given! Please make sure to put "-" before an argument.',
      });

      return false;
    }

    if (type === "add") {
      for (var i = 0; i < rest.length; i += 2) {
        var key = rest[i].trim().toLowerCase()[0];
        if (rest.length <= i + 1) {
          this.setState({
            error:
              'A name was not given for the key "' +
              key +
              '"! Please make sure to put "-" before an argument.',
          });
          return false;
        }
        var name = rest[i + 1].trim().toLowerCase();
        this.props.AddCol(key, name);
      }
      return true;
    } else if (type === "rem") {
      for (var j = 0; j < rest.length; j++) {
        var keyrem = rest[j].trim().toLowerCase()[0];
        if (this.props.col[keyrem] !== undefined) this.props.remCol(keyrem);
      }
      return true;
    }
    this.setState({
      error:
        'Could not recognize the command "' +
        type +
        '"! possible commands are \\add or \\rem.',
    });
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
    if (success)
      this.setState({
        text: "",
        error: "",
      });
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <div>
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
        <p className="mt-4 fs-5 text-danger">{this.state.error}</p>
      </div>
    );
  }
}
export default InputParser;
