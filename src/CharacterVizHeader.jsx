import React from "react";

export default function CharacterVizHeader({ name, thumbnail, children }) {
	return (
		<div className="c-viz__header">
			<div className="c-viz__title-container">
				<div className="c-viz__character-image-container">
					{thumbnail && (
						<img src={thumbnail} alt="	" className="c-viz__character-image" />
					)}
				</div>
				<h2 className="c-viz__title">
					<span className="c-viz__kicker">Sentiments for</span>
					{name}
				</h2>
			</div>
			{children}
		</div>
	);
}
