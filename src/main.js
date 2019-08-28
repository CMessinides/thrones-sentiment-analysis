import scoresUrl from "../data/mean-scores.json";
import episodeMetadataUrl from "./static/episode-meta.json";
import characterMetadataUrl from "./static/character-meta.json";

import React from "react";
import ReactDOM from "react-dom";
import OverallScoresChart from "./OverallScoresChart";

const manifest = {
	"overall-scores-chart": OverallScoresChart
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
