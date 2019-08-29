import React from "react";

export default function CharacterScatterPlot({ xScale, yScale, scores }) {
	return scores.map(score => {
		const x = xScale(score.x);
		const y = yScale(score.y);

		return (
			<g className="fill-current stroke-current text-purple-700" key={score.x}>
				<circle
					cx={x}
					cy={y}
					r={75 * score.proportion}
					fillOpacity="0.33"
					stroke="none"
				></circle>
				<line
					x1={x}
					x2={x}
					y1={yScale(score.upper)}
					y2={yScale(score.lower)}
					strokeWidth="1.5"
				></line>
				<circle cx={x} cy={y} r="3" stroke="none"></circle>
			</g>
		);
	});
}
