import React, { Component } from 'react';
import Cell from './Cell';

export default class Maze extends Component {

	render() {
		var cells = [];
		var cellMap = this.props.cells;
		var cellSize = this.props.cellSize;

		for (let i = 0; i < (this.props.cols * this.props.rows); i++) {
			var cell = cellMap[i];
			cells.push(<Cell size={cellSize} backgroundColor={cell.backgroundColor} topBorder={cell.topBorder} rightBorder={cell.rightBorder} bottomBorder={cell.bottomBorder} leftBorder={cell.leftBorder} />);
		}

		return (
			<div style={{
					border: "1px solid #555",
					backgroundColor: "#EEE",
					width: (this.props.cellSize * this.props.cols),
					height: (this.props.cellSize * this.props.rows)
				}}>{cells}</div>
		);
	}
}