import React from "react";
import ErrorMessage from "./ErrorMessage";
import Chart from "./Chart";
import OverallLine from "./OverallLine";
import useChartContext from "./useChartContext";
import ChartLabel from "./ChartLabel";

export default function OverallScoresChart({ data = {}, error = null } = {}) {
	const chart = useChartContext({ domain: { y: [-0.2, 0.2] } });

	if (error) return <ErrorMessage />;

	const s1e9 = data.overall[8];
	const s3e9 = data.overall[28];
	const s5e10 = data.overall[49];
	const s8e3 = data.overall[69];

	return (
		<div className="c-viz">
			<h2 className="c-viz__title">
				<span className="c-viz__kicker">Average Sentiment Scores</span>
				All Episodes
			</h2>
			<div className="c-viz__scroll-container">
				<div className="c-viz__chart-container">
					<Chart {...chart}>
						<OverallLine {...chart} data={data} />
						<g className="c-chart-labels text-purple-600">
							<ChartLabel {...chart} point={s1e9} direction="down" length={77}>
								Ned&rsquo;s execution
							</ChartLabel>
							<ChartLabel {...chart} point={s3e9} length={105} align="right">
								The Red Wedding
							</ChartLabel>
							<ChartLabel {...chart} point={s5e10} length={126} align="right">
								<tspan>Jon Snow&rsquo;s</tspan>
								<tspan>assassination</tspan>
							</ChartLabel>
							<ChartLabel {...chart} point={s8e3} length={125} align="right">
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
