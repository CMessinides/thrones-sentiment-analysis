import React from "react";
import EpisodesAxis from "./EpisodesAxis";
import ScoresAxis from "./ScoresAxis";
import TooltipOverlay from "./TooltipOverlay";

export default function Chart({
	isReady,
	svgRef,
	height,
	width,
	padding,
	xScale,
	xTicks,
	yScale,
	yTicks,
	tooltipElement,
	tooltipData,
	children
}) {
	const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);

	return (
		<svg className="c-chart" ref={svgRef}>
			{isReady ? (
				<>
					<ScoresAxis {...{ scale: yScale, ticks: yTicks, padding }} />
					<EpisodesAxis
						{...{ scale: xScale, ticks: xTicks, height, padding }}
					/>
					<g opacity={isTooltipVisible ? 0.5 : undefined}>{children}</g>
					<TooltipOverlay
						tooltip={tooltipElement}
						dataSeries={tooltipData}
						xScale={xScale}
						yScale={yScale}
						height={height}
						width={width}
						padding={padding}
						onShowTooltip={() => setIsTooltipVisible(true)}
						onHideTooltip={() => setIsTooltipVisible(false)}
					/>
				</>
			) : null}
		</svg>
	);
}
