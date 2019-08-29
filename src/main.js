import scoresUrl from "../data/mean-scores.json";
import episodeMetadataUrl from "./static/episode-meta.json";
import characterMetadataUrl from "./static/character-meta.json";

import React from "react";
import ReactDOM from "react-dom";
import OverallScoresViz from "./OverallScoresViz";
import CharacterViz from "./CharacterViz.jsx";
import ChartLabel from "./ChartLabel";

const manifest = {
	"overall-scores-viz": OverallScoresViz,
	"jon-snow-viz": props => (
		<CharacterViz {...props} name="Jon Snow" domain={{ y: [-0.3, 0.3] }} />
	),
	"stannis-viz": props => (
		<CharacterViz
			{...props}
			name="Stannis Baratheon"
			domain={{ y: [-0.4, 0.4] }}
			labels={({ points, labelProps }) => (
				<ChartLabel
					point={points.find(
						({ season, episode }) => season === 5 && episode === 9
					)}
					direction="up"
					length={152}
					{...labelProps}
				>
					<tspan>Stannis burns</tspan>
					<tspan>Shireen at the stake</tspan>
				</ChartLabel>
			)}
		/>
	),
	"hodor-viz": props => (
		<CharacterViz
			{...props}
			name="Hodor"
			domain={{ y: [-0.4, 0.4] }}
			labels={({ points, labelProps }) => (
				<ChartLabel
					point={points.find(
						({ season, episode }) => season === 6 && episode === 5
					)}
					length={128}
					{...labelProps}
				>
					<tspan>Hodor holds</tspan>
					<tspan>the door</tspan>
				</ChartLabel>
			)}
		/>
	)
};

Promise.all([
	fetchJson(scoresUrl),
	fetchJson(episodeMetadataUrl),
	fetchJson(characterMetadataUrl)
])
	.then(([data, episodes, characters]) =>
		mountCharts(manifest, { data, metadata: { episodes, characters } })
	)
	.catch(error => mountCharts(manifest, { error }));

class FetchError extends Error {}
function fetchJson(url) {
	return fetch(url)
		.then(resp => {
			if (!resp.ok) {
				throw FetchError("Response not OK, status " + resp.status);
			}

			return resp.json();
		})
		.catch(e => {
			if (e instanceof FetchError) throw e;
			throw new FetchError("Encountered unexpected error: " + e);
		});
}

function mountCharts(manifest, props = {}) {
	for (let id in manifest) {
		const Chart = manifest[id];
		const root = document.getElementById(id);
		removeLoadingIndicator(root);
		ReactDOM.render(<Chart {...props} />, root);
	}
}

function removeLoadingIndicator(rootEl) {
	const loader = rootEl.querySelector("[data-loading-indicator]");
	if (loader) rootEl.removeChild(loader);
}
