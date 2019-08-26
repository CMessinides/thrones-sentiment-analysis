import { useState, useRef, useLayoutEffect } from "react";
import merge from "lodash.merge";
import { scaleLinear } from "d3-scale";

const getDefaultSettings = () => ({
	domain: {
		x: [1, 73],
		y: [-0.75, 0.75]
	},
	ticks: {
		x: Array.from(Array(73).keys()).map(i => i + 1),
		y: yScale => yScale.ticks(5)
	},
	padding: {
		top: 20,
		bottom: 20,
		left: 32,
		right: 16
	}
});

function normalizeTicks(ticks, scales) {
	const normalizedTicks = {};

	for (const axis of ["x", "y"]) {
		normalizedTicks[axis] =
			typeof ticks[axis] === "function"
				? ticks[axis](scales[axis])
				: ticks[axis];
	}

	return normalizedTicks;
}

export default function useChartContext(userSettings = null) {
	const { domain, padding, ticks } = merge(getDefaultSettings(), userSettings);

	const [isReady, setIsReady] = useState(false);
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);
	const svgRef = useRef(null);
	useLayoutEffect(() => {
		function onResize() {
			if (svgRef.current) {
				setIsReady(true);
				const { height, width } = svgRef.current.getBoundingClientRect();
				setHeight(height);
				setWidth(width);
			}
		}

		window.addEventListener("resize", onResize);
		onResize();

		return () => {
			setIsReady(false);
			window.removeEventListener("resize", onResize);
		};
	}, []);

	const xScale = scaleLinear()
		.rangeRound([padding.left, width - padding.right])
		.domain(domain.x);
	const yScale = scaleLinear()
		.rangeRound([height - padding.top, padding.bottom])
		.domain(domain.y);

	const { x: xTicks, y: yTicks } = normalizeTicks(ticks, {
		x: xScale,
		y: yScale
	});

	return {
		isReady,
		height,
		width,
		svgRef,
		xScale,
		yScale,
		xTicks,
		yTicks,
		padding
	};
}
