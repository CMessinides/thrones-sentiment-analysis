import React from "react";
import Tooltip from "./Tooltip";

export default function OverallTooltip({ datum, metadata }) {
	return (
		<Tooltip
			datum={datum}
			metadata={metadata}
			renderRows={({ datum }) => (
				<>
					<Tooltip.Row label="Comments" value={datum.n} />
					<Tooltip.AvgRow datum={datum} />
					<Tooltip.ConfIntRow datum={datum} />
				</>
			)}
		/>
	);
}
