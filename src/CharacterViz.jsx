import React from "react";
import ErrorMessage from "./ErrorMessage";
import CharacterChart from "./CharacterChart";

export default function CharacterViz({
	name,
	data,
	metadata,
	domain,
	labels = null,
	error = null
}) {
	if (error) return <ErrorMessage />;

	const characterMeta = metadata.characters[name] || {};

	return (
		<div className="c-viz">
			<div className="c-viz__header">
				{characterMeta.thumbnail && (
					<img
						src={characterMeta.thumbnail}
						alt="	"
						className="c-viz__character-image"
					/>
				)}
				<h2 className="c-viz__title">
					<span className="c-viz__kicker">Sentiments for</span>
					{name}
				</h2>
			</div>
			<div className="c-viz__scroll-container">
				<div className="c-viz__chart-container">
					<CharacterChart {...{ name, data, metadata, labels, domain }} />
				</div>
			</div>
		</div>
	);
}
