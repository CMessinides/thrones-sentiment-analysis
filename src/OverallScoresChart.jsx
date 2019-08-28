import React from "react";
import ErrorMessage from "./ErrorMessage";
import Chart from "./Chart";
import OverallLine from "./OverallLine";
import useChartContext from "./useChartContext";
import ChartLabel from "./ChartLabel";

export default function OverallScoresChart({
	data,
	metadata,
	error = null
} = {}) {
	const chart = useChartContext({ domain: { y: [-0.2, 0.2] } });

	if (error) return <ErrorMessage />;

	const s1e9 = data.overall[8];
	const s3e9 = data.overall[28];
	const s5e10 = data.overall[49];
	const s8e3 = data.overall[69];

	const Tooltip = ({ datum }) => {
		const { x, y, upper, lower, n, season, episode } = datum;
		const { title } = metadata.episodes[x - 1];

		return (
			<article className="c-tooltip">
				<dl className="c-tooltip__container">
					<div className="c-tooltip__ep-kicker">
						<dt>Season</dt>
						<dd>{season}</dd>
						<dt>Episode</dt>
						<dd>{episode}</dd>
					</div>
					<dt className="sr-only">Title</dt>
					<dd className="c-tooltip__ep-title">{title}</dd>
					<div className="c-tooltip__footer">
						<div className="c-tooltip__footer-row">
							<dt>Comments</dt>
							<dd>{n}</dd>
						</div>
						<div className="c-tooltip__footer-row">
							<dt>Mean score</dt>
							<dd>{y.toFixed(3)}</dd>
						</div>
						<div className="c-tooltip__footer-row">
							<dt>95% C.I.</dt>
							<dd>
								({lower.toFixed(3)}, {upper.toFixed(3)})
							</dd>
						</div>
					</div>
				</dl>
			</article>
		);
	};

	return (
		<div className="c-viz">
			<h2 className="c-viz__title">
				<span className="c-viz__kicker">Average Sentiment Scores</span>
				All Episodes
			</h2>
			<div className="c-viz__scroll-container">
				<div className="c-viz__chart-container">
					<Chart
						{...chart}
						tooltipData={data.overall}
						tooltipComponent={Tooltip}
					>
						<OverallLine {...chart} data={data} />
						<g className="c-chart-labels text-purple-600">
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
