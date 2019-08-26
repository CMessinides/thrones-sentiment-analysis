import React from "react";
import EpisodesAxis from "./EpisodesAxis";
import ScoresAxis from "./ScoresAxis";

export default function Chart({
	isReady,
	svgRef,
	height,
	padding,
	xScale,
	xTicks,
	yScale,
	yTicks,
	children
}) {
	return (
		<svg className="c-chart" ref={svgRef}>
			{isReady ? (
				<>
					<ScoresAxis {...{ scale: yScale, ticks: yTicks, padding }} />
					<EpisodesAxis
						{...{ scale: xScale, ticks: xTicks, height, padding }}
					/>
					{children}
				</>
			) : null}
		</svg>
	);
}
