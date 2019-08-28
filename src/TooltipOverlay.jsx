import React from "react";

function TooltipWrapper({
	x,
	y,
	chartHeight,
	chartWidth,
	chartPadding,
	height = 164,
	width = 180,
	padding = 6,
	children
}) {
	const xTransform =
		x + width > chartWidth - chartPadding.right ? -width - padding : padding;
	const yTransform = y > chartHeight / 2 ? -padding - height : padding;

	return (
		<>
			<g fill="currentColor" stroke="none" className="text-purple-700">
				<circle cx={x} cy={y} r="4"></circle>
			</g>
			<g transform={`translate(${x + xTransform},${y + yTransform})`}>
				<rect
					width={width}
					height={height}
					fill="white"
					strokeOpacity="0.5"
				></rect>
				<foreignObject width={width} height={height}>
					{children}
				</foreignObject>
			</g>
		</>
	);
}

export default function TooltipOverlay({
	xScale,
	yScale,
	padding,
	height,
	width,
	dataSeries = [],
	onShowTooltip,
	onHideTooltip,
	tooltipComponent: Tooltip = () => null
}) {
	const [tooltipDatum, setTooltipDatum] = React.useState(null);

	const callbacks = {
		show: onShowTooltip,
		hide: onHideTooltip
	};

	function notify(eventCode, ...callbackArgs) {
		const callback = callbacks[eventCode];
		if (typeof callback === "function") {
			callback(...callbackArgs);
		}
	}

	function onHoverHandlerFactory(datum) {
		return () => {
			notify("show", datum);
			setTooltipDatum(datum);
		};
	}

	return (
		<>
			<g
				className="c-tooltip-overlay"
				onMouseLeave={() => {
					setTooltipDatum(datum => {
						notify("hide", datum);
						return null;
					});
				}}
			>
				{dataSeries.map(d => (
					<rect
						key={d.x}
						className="c-tooltip-overlay__cell"
						x={xScale(d.x - 0.5)}
						y={padding.top}
						width={xScale(d.x + 0.5) - xScale(d.x - 0.5)}
						height={height - padding.top - padding.bottom}
						style={{ fill: "none", stroke: "none", pointerEvents: "all" }}
						onMouseOver={onHoverHandlerFactory(d)}
					></rect>
				))}
				{tooltipDatum && (
					<TooltipWrapper
						x={xScale(tooltipDatum.x)}
						y={yScale(tooltipDatum.y)}
						chartPadding={padding}
						chartHeight={height}
						chartWidth={width}
					>
						<Tooltip datum={tooltipDatum} />
					</TooltipWrapper>
				)}
			</g>
		</>
	);
}