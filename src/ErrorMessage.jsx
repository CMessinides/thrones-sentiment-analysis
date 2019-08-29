import React from "react";

export default function ErrorMessage() {
	return (
		<div className="c-alert c-alert--bold o-container">
			<div className="c-alert__icon c-alert__icon--halo">
				<svg className="c-icon c-icon--fill">
					<use href="#icon-error"></use>
				</svg>
			</div>
			<p className="c-alert__text">
				<strong className="c-alert__heading">
					The night is dark and full of errors.
				</strong>{" "}
				<span className="c-alert__body">
					There was a problem loading this visualization. Check your internet
					connection and try reloading this page.
				</span>
			</p>
		</div>
	);
}
