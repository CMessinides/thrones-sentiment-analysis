import React from "react";

export default function CharacterScatterPlot({ xScale, yScale, scores }) {
	return scores.map(score => {
		const x = xScale(score.x);
		const y = yScale(score.y);

		return (
			<g className="c-chart-point" key={score.x}>
				<circle
					className="c-chart-point__area"
					cx={x}
					cy={y}
					r={75 * score.proportion}
				></circle>
				<line
					className="c-chart-point__interval"
					x1={x}
					x2={x}
					y1={yScale(score.upper)}
					y2={yScale(score.lower)}
				></line>
				<circle className="c-chart-point__center" cx={x} cy={y} r="3"></circle>
			</g>
		);
	});
}
