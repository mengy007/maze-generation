import React, { Component } from 'react';
import Maze from './Maze';
import Cell from './Cell';
import './App.css';

class App extends Component {

  constructor(args) {
    var cells = [];
    var cols = 80;
    var rows = 50;
    var cellSize = 11;

    super(args);

    for (let i = 0; i < (rows*cols); i++) {
      cells.push({
        backgroundColor: "#EEE",
        topBorder: true,
        rightBorder: true,
        bottomBorder: true,
        leftBorder: true
      });
    }

    this.state = {
      cells: cells,
      cellSize: cellSize,
      rows: rows,
      cols: cols
    }
  }

  hasUnvisitedCells(cells) {
    for (let i = 0; i < cells.length; i++) {
      if (!cells[i].visited) {
        return true;
      }
    }

    return false;
  }

  generateMaze(e) {
    var cells = this.state.cells;
    var rows = this.state.rows;
    var cols = this.state.cols;
    var index = Math.floor(Math.random() * cells.length);
    var stack = [];
    var x = index % cols;
    var y = Math.floor(index / cols);
    var currentCell = cells[index];
    var count = 0;

    // Mark call cells as not visited
    for (let i = 0; i < cells.length; i++) {
      cells[i].visited = false;
      cells[i].topBorder = true;
      cells[i].rightBorder = true;
      cells[i].bottomBorder = true;
      cells[i].leftBorder = true;
      cells[i].backgroundColor = "#EEE";
    }

    this.setState({
      cells: cells
    });

    while (this.hasUnvisitedCells(cells)) {
      var dirs = [];

      cells[index].visited = true;

      // Add only valid neighbors
      if (y - 1 >= 0 && !cells[x+cols*(y-1)].visited) {
        dirs.push({
          x: x,
          y: y - 1,
          name: "U"
        });
      }
      if (x + 1 < cols && !cells[(x+1)+cols*y].visited) {
        dirs.push({
          x: x + 1,
          y: y,
          name: "R"
        });
      }
      if (y + 1 < rows && !cells[x+cols*(y+1)].visited) {
        dirs.push({
          x: x,
          y: y + 1,
          name: "D"
        });
      }
      if (x - 1 >= 0 && !cells[(x-1)+cols*y].visited) {
        dirs.push({
          x: x - 1,
          y: y,
          name: "L"
        });
      }

      if (dirs.length > 0) {
        // Choose random neighbor
        var i = Math.floor(Math.random() * dirs.length);
        var dir = dirs[i];
        var dirIndex = dir.x + cols * dir.y;

        stack.push(index);

        cells[index].backgroundColor = "#FFF";
        cells[dirIndex].backgroundColor = "#FFF";

        if (dir.name === "U") {
          cells[index].topBorder = false;
          cells[dirIndex].bottomBorder = false;
          //console.log("Digging Up");
        } else if (dir.name === "R") {
          cells[index].rightBorder = false;
          cells[dirIndex].leftBorder = false;
          //console.log("Digging Right");
        } else if (dir.name === "D") {
          cells[index].bottomBorder = false;
          cells[dirIndex].topBorder = false;
          //console.log("Digging Down");
        } else if (dir.name === "L") {
          cells[index].leftBorder = false;
          cells[dirIndex].rightBorder = false;
          //console.log("Digging Left");
        }

        currentCell = cells[dirIndex];
        cells[dirIndex].visited = true;
        x = dir.x;
        y = dir.y;
        index = x + cols * y;
      } else if (stack.length > 0) {
        index = stack.pop();
        x = index % cols;
        y = Math.floor(index / cols);
      } else {
        //console.log("No dirs or stack: " + stack.length);
      }

      this.setState({
        cells: cells
      });
    }

    console.log("Done: " + count);

    this.setState({
      cells: cells
    });
  }

  render() {
    return (
      <div style={{ margin: "20px" }}>
        <input type="button" value="Generate" onClick={this.generateMaze.bind(this)} /><br />
        <br />
        <Maze rows={this.state.rows} cols={this.state.cols} cellSize={this.state.cellSize} cells={this.state.cells} />
      </div>
    );
  }
}

export default App;
