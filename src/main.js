import scoresUrl from "../data/mean-scores.json";
import episodeMetadataUrl from "./static/episode-meta.json";
import characterMetadataUrl from "./static/character-meta.json";

import React from "react";
import ReactDOM from "react-dom";
import { json } from "d3-fetch";
import ErrorMessage from "./ErrorMessage";
import OverallScoresViz from "./OverallScoresViz";
import CharacterViz from "./CharacterViz.jsx";
import ChartLabel from "./ChartLabel";
import CharacterSearchClient from "./CharacterSearchClient";
import SearchableCharacterViz from "./SearchableCharacterViz.jsx";
import DataTable from "./DataTable";

const manifest = {
  "overall-scores-viz": OverallScoresViz,
  "jon-snow-viz": props => (
    <CharacterViz {...props} name="Jon Snow" domain={{ y: [-0.3, 0.3] }} />
  ),
  "searchable-character-viz": props => (
    <SearchableCharacterViz
      searchClient={new CharacterSearchClient(props.data)}
      {...props}
    />
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
  json(scoresUrl),
  json(episodeMetadataUrl),
  json(characterMetadataUrl)
])
  .then(([data, episodes, characters]) =>
    mountCharts(manifest, { data, metadata: { episodes, characters } })
  )
  .catch(error => mountErrors(manifest, { error }));

document.querySelectorAll("[data-table]").forEach(root => {
  new DataTable(root, {
    sortOptions: {
      "score-asc": rows => {
        return rows.sort(sortByMean);
      },
      "score-desc": rows => {
        return rows.sort(sortByMean).reverse();
      }
    }
  });
});
function sortByMean(rowA, rowB) {
  if (rowA.mean === rowB.mean) return 0;
  return rowA.mean < rowB.mean ? -1 : 1;
}

function mountCharts(manifest, props = {}) {
  for (let id in manifest) {
    const Chart = manifest[id];
    const root = document.getElementById(id);
    removeLoadingIndicator(root);
    ReactDOM.render(<Chart {...props} />, root);
  }
}

function mountErrors(manifest, { error }) {
  for (const id in manifest) {
    if (manifest.hasOwnProperty(id)) {
      const root = document.getElementById(id);
      removeLoadingIndicator(root);
      ReactDOM.render(<ErrorMessage error={error} />, root);
    }
  }
}

function removeLoadingIndicator(rootEl) {
  const loader = rootEl.querySelector("[data-loading-indicator]");
  if (loader) rootEl.removeChild(loader);
}
