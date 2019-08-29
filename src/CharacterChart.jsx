import React from "react";
import Chart from "./Chart";
import useChartContext from "./useChartContext";
import OverallLine from "./OverallLine";
import CharacterScatterPlot from "./CharacterScatterPlot";
import CharacterTooltip from "./CharacterTooltip";

export default function CharacterChart({
	name,
	data,
	metadata,
	domain,
	labels = null
}) {
	const chart = useChartContext({ domain });

	const scores = data[name];

	return (
		<Chart
			{...chart}
			tooltipData={scores}
			tooltipElement={<CharacterTooltip metadata={metadata} />}
		>
			<OverallLine {...chart} data={data} variant="subtle" />
			<CharacterScatterPlot {...chart} scores={scores} />
			{typeof labels === "function" && (
				<g className="c-chart-labels text-emphasis-700">
					{labels({ points: scores, labelProps: chart })}
				</g>
			)}
		</Chart>
	);
}
