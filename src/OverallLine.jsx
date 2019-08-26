import React from "react";
import { line } from "d3-shape";

export default function OverallLine({ data, xScale, yScale, variant }) {
	const points = data.overall;
	const path = line()
		.x(d => xScale(d.x))
		.y(d => yScale(d.y));

	const classNames = ["c-chart-line"];
	const variants = Array.isArray(variant) ? variant : [variant];
	for (let variant of variants.filter(Boolean)) {
		classNames.push(`c-chart-line--${variant}`);
	}

	return <path className={classNames.join(" ")} d={path(points)} />;
}
