import React from "react";

function normalizeLines(children) {
	return React.Children.map(children, child =>
		React.isValidElement(child) ? child : <tspan>{child}</tspan>
	);
}

function renderTspans(lines, x) {
	return lines.map((line, i) =>
		React.cloneElement(line, { key: i, x, dy: i && `1em` })
	);
}

export default function ChartLabel({
	point,
	xScale,
	yScale,
	direction = "up",
	align = "left",
	length = 64,
	offset = 0,
	textPadding = 4,
	fontSize = 13,
	children
}) {
	const lines = normalizeLines(children);
	const x1 = xScale(point.x);
	const y1 = yScale(point.y);
	const y2 = direction === "down" ? Math.abs(length) : -Math.abs(length);
	const yPadding =
		direction === "down" ? Math.abs(textPadding) : -Math.abs(textPadding);
	const textOffset =
		direction === "down"
			? lines.length * fontSize * 0.9 - fontSize * 0.33
			: -1 * (lines.length - 1) * (fontSize * 0.9);

	return (
		<g className="c-chart-label" transform={`translate(${x1}, ${y1})`}>
			<circle r="4"></circle>
			{offset && <line x2={offset}></line>}
			<line x1={offset} x2={offset} y2={y2}></line>
			<text
				fontSize={fontSize}
				y={y2 + yPadding + textOffset}
				x={offset}
				textAnchor={align === "right" ? "end" : undefined}
			>
				{renderTspans(lines, offset)}
			</text>
		</g>
	);
}
