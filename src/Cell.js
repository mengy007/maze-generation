import React, { Component } from 'react';

export default class Cell extends Component {

	render() {
		var style = {
			backgroundColor: this.props.backgroundColor,
			width: this.props.size,
			height: this.props.size,
			border: "0",
			float: "left",
			boxSizing: "border-box"
		};

		if (this.props.topBorder) {
			style.borderTop = "1px solid #555";
		}
		if (this.props.rightBorder) {
			style.borderRight = "1px solid #555";
		}
		if (this.props.bottomBorder) {
			style.borderBottom = "1px solid #555";
		}
		if (this.props.leftBorder) {
			style.borderLeft = "1px solid #555";
		}

		return (
			<div style={style}>&nbsp;</div>
		);
	}
}