import React from "react";
import Tooltip from "./Tooltip";

export default function CharacterTooltip({ datum, metadata }) {
	return (
		<Tooltip
			datum={datum}
			metadata={metadata}
			renderRows={({ datum }) => (
				<>
					<Tooltip.Row label="Mentions" value={datum.n} />
					<Tooltip.Row
						label="% of all mentions"
						value={(datum.proportion * 100).toFixed(3)}
						variant="indented"
					/>
					<Tooltip.AvgRow datum={datum} />
					<Tooltip.ConfIntRow datum={datum} />
				</>
			)}
		/>
	);
}
