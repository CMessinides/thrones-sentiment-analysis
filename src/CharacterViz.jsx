import React from "react";
import ErrorMessage from "./ErrorMessage";
import CharacterChart from "./CharacterChart";
import CharacterVizHeader from "./CharacterVizHeader";

export default function CharacterViz({
	name,
	data,
	metadata,
	domain,
	labels = null
}) {
	const characterMeta = metadata.characters[name] || {};

	return (
		<div className="c-viz">
			<CharacterVizHeader name={name} thumbnail={characterMeta.thumbnail} />
			<div className="c-viz__scroll-container">
				<div className="c-viz__chart-container">
					<CharacterChart {...{ name, data, metadata, labels, domain }} />
				</div>
			</div>
		</div>
	);
}
