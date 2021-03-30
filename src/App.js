import React, { Component } from "react";
import "./App.css";
import InputParser from "./Components/InputParser";
import ShowCards from "./Components/ShowCards";
import ShowInfo from "./Components/ShowInfo";
class App extends Component {
  state = {
    input: "",
    columns: {},
    pinned: {},
  };

  componentDidMount() {
    var col = JSON.parse(localStorage.getItem("col"));
    console.log(col);
    if (col !== null) this.setState({ columns: col });
  }

  AddNote = (key, note) => {
    var Newcolumns = this.state.columns;
    Newcolumns[key].push([note, 0]);
    this.setState({ columns: Newcolumns });
  };

  AddColumn = (key, name) => {
    var Newcolumns = this.state.columns;
    var cols = JSON.parse(localStorage.getItem("col"));
    if (cols === null) cols = {};
    if (Newcolumns[key] !== undefined) {
      Newcolumns[key][0] = name;
      cols[key][0] = name;
    } else {
      Newcolumns[key] = [name];
      cols[key] = [name];
    }
    this.setState({ columns: Newcolumns });
    localStorage.setItem("col", JSON.stringify(cols));
  };

  RemoveNote = (key, index) => {
    var Newcolumns = this.state.columns;
    if (Newcolumns[key][index][1] > 0) {
      var col = JSON.parse(localStorage.getItem("col"));
      col[key].splice(Newcolumns[key][index][1], 1);
      localStorage.setItem("col", JSON.stringify(col));
    }
    Newcolumns[key].splice(index, 1);
    this.setState({ columns: Newcolumns });
  };

  RemoveColumn = (key) => {
    var Newcolumns = this.state.columns;
    var cols = JSON.parse(localStorage.getItem("col"));
    delete Newcolumns[key];
    delete cols[key];
    this.setState({ columns: Newcolumns });
    localStorage.setItem("col", JSON.stringify(cols));
  };

  PinNote = (key, index) => {
    if (this.state.columns[key][index][1] > 0) this.UnpinNote(key, index);
    else {
      console.log("pinned");
      var Newcolumns = this.state.columns;
      var col = JSON.parse(localStorage.getItem("col"));
      Newcolumns[key][index][1] = col[key].length;
      this.setState({ columns: Newcolumns });
      col[key].push(this.state.columns[key][index]);
      console.log(col);
      localStorage.setItem("col", JSON.stringify(col));
    }
  };

  UnpinNote = (key, index) => {
    var Newcolumns = this.state.columns;
    var col = JSON.parse(localStorage.getItem("col"));
    col[key].splice(Newcolumns[key][index][1], 1);
    Newcolumns[key][index][1] = 0;
    this.setState({ columns: Newcolumns });
    localStorage.setItem("col", JSON.stringify(col));
  };

  ResetAll = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className="App container ">
        <h1 className="mt-5 text-white">Quick Notes</h1>
        <InputParser
          AddNote={this.AddNote}
          col={this.state.columns}
          AddCol={this.AddColumn}
          remCol={this.RemoveColumn}
        />
        <ShowCards
          columns={this.state.columns}
          removeNote={this.RemoveNote}
          RemoveColumn={this.RemoveColumn}
          pin={this.PinNote}
        />
        <ShowInfo columns={this.state.columns} ResetAll={this.ResetAll} />
      </div>
    );
  }
}

export default App;
