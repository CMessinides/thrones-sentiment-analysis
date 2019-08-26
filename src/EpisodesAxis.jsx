import React from "react";
import classNames from "classnames";
import { isLandmarkEpisode, getSeasonAndEpisode } from "./episodes";

function formatTick(x) {
	const [season, episode] = getSeasonAndEpisode(x);
	return `S${season}E${episode}`;
}

export default function EpisodesAxis({ ticks, scale, height, padding }) {
	return (
		<g className="c-axis c-axis--x">
			{ticks.map(x => (
				<g
					key={x}
					className={classNames("c-tick", "c-tick--x", `c-tick--${x}`, {
						"c-tick--landmark": isLandmarkEpisode(x)
					})}
					transform={`translate(${scale(x)},${height})`}
				>
					<line y1={-height} y2={-padding.bottom} x1="0" x2="0"></line>
					{isLandmarkEpisode(x) && (
						<text y="-2" textAnchor="middle">
							{formatTick(x)}
						</text>
					)}
				</g>
			))}
		</g>
	);
}
