import React, { Component } from "react";
import "./App.css";
import InputParser from "./Components/InputParser";
import ShowCards from "./Components/ShowCards";
import ShowInfo from "./Components/ShowInfo";
class App extends Component {
  state = {
    input: "",
    columns: {},
  };

  componentDidMount() {
    var col = JSON.parse(localStorage.getItem("col"));
    console.log(col);
    if (col !== null) this.setState({ columns: col });
  }

  AddNote = (key, note) => {
    var Newcolumns = this.state.columns;
    Newcolumns[key].push(note);
    this.setState({ columns: Newcolumns });
  };

  AddColumn = (key, name) => {
    var Newcolumns = this.state.columns;
    if (Newcolumns[key] !== undefined) Newcolumns[key][0] = [name];
    else Newcolumns[key] = [name];
    this.setState({ columns: Newcolumns });
    localStorage.setItem("col", JSON.stringify(this.state.columns));
  };

  RemoveNote = (key, index) => {
    var Newcolumns = this.state.columns;
    Newcolumns[key].splice(index, 1);
    this.setState({ columns: Newcolumns });
  };

  RemoveColumn = (key) => {
    var Newcolumns = this.state.columns;
    delete Newcolumns[key];
    this.setState({ columns: Newcolumns });
  };

  ResetAll = () => {
    var Newcolumns = this.state.columns;
    var keys = Object.keys(Newcolumns);
    for (var i = 0; i < keys.length; i++) {
      Newcolumns[keys[i]] = [Newcolumns[keys[i]][0]];
    }
    this.setState({ columns: Newcolumns });
  };

  render() {
    return (
      <div className="App container">
        <h1 className="mt-5 text-white">Quick Notes</h1>
        <InputParser
          AddNote={this.AddNote}
          col={this.state.columns}
          AddCol={this.AddColumn}
          remCol={this.RemoveColumn}
        />
        <ShowCards columns={this.state.columns} removeNote={this.RemoveNote} />
        <ShowInfo columns={this.state.columns} ResetAll={this.ResetAll} />
      </div>
    );
  }
}

export default App;
