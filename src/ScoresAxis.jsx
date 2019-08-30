import React from "react";
import classNames from "classnames";

export default function ScoresAxis({ ticks, scale, padding, width }) {
	return (
		<g className="c-axis c-axis--y" transform={`translate(0,${padding.top})`}>
			{ticks.map((y, i) => (
				<g
					key={y}
					className={classNames("c-tick", "c-tick--y", `c-tick--${y}`)}
					transform={`translate(0,${scale(y) - padding.bottom})`}
				>
					<line x2="100%"></line>
					<text y="-4">
						{y}
						{i === ticks.length - 1 && " avg. sentiment score (n ≥ 30)"}
					</text>
				</g>
			))}
		</g>
	);
}
