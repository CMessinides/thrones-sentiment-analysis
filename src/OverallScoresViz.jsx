import React from "react";
import ErrorMessage from "./ErrorMessage";
import Chart from "./Chart";
import OverallLine from "./OverallLine";
import OverallTooltip from "./OverallTooltip";
import useChartContext from "./useChartContext";
import ChartLabel from "./ChartLabel";

export default function OverallScoresViz({ data, metadata } = {}) {
	const chart = useChartContext({ domain: { y: [-0.2, 0.2] } });

	const s1e9 = data.overall[8];
	const s3e9 = data.overall[28];
	const s5e10 = data.overall[49];
	const s8e3 = data.overall[69];

	return (
		<div className="c-viz">
			<div className="c-viz__title-container">
				<h2 className="c-viz__title">
					<span className="c-viz__kicker">Average Sentiment Scores</span>
					All Episodes
				</h2>
			</div>
			<div className="c-viz__scroll-container">
				<div className="c-viz__chart-container">
					<Chart
						{...chart}
						tooltipData={data.overall}
						tooltipElement={<OverallTooltip metadata={metadata} />}
					>
						<OverallLine {...chart} data={data} />
						<g className="c-chart-labels text-emphasis-700">
							<ChartLabel {...chart} point={s1e9} direction="down" length={94}>
								Ned&rsquo;s execution
							</ChartLabel>
							<ChartLabel {...chart} point={s3e9} length={126} align="right">
								The Red Wedding
							</ChartLabel>
							<ChartLabel {...chart} point={s5e10} length={151} align="right">
								<tspan>Jon Snow&rsquo;s</tspan>
								<tspan>assassination</tspan>
							</ChartLabel>
							<ChartLabel {...chart} point={s8e3} length={150} align="right">
								<tspan>The Battle</tspan>
								<tspan>of Winterfell</tspan>
							</ChartLabel>
						</g>
					</Chart>
				</div>
			</div>
		</div>
	);
}
