import React from "react";

function Tooltip({ datum, metadata, renderRows }) {
	if (!datum) return null;

	const { x, season, episode } = datum;

	const { title } = metadata.episodes[x - 1];

	return (
		<article className="c-tooltip">
			<dl className="c-tooltip__container">
				<div className="c-tooltip__ep-kicker">
					<dt>Season</dt>
					<dd>{season}</dd>
					<dt>Episode</dt>
					<dd>{episode}</dd>
				</div>
				<dt className="sr-only">Title</dt>
				<dd className="c-tooltip__ep-title">{title}</dd>
				{typeof renderRows === "function" && (
					<div className="c-tooltip__footer">{renderRows({ datum })}</div>
				)}
			</dl>
		</article>
	);
}

Tooltip.Row = function TooltipRow({ label, value, variant = [] }) {
	const variants = Array.isArray(variant) ? variant : [variant];
	const classNames = ["c-tooltip__footer-row"];
	for (const variant of variants.filter(Boolean)) {
		classNames.push(`c-tooltip__footer-row--${variant}`);
	}

	return (
		<div className={classNames.join(" ")}>
			<dt>{label}</dt>
			<dd>{value}</dd>
		</div>
	);
};

Tooltip.AvgRow = function TooltipAvgRow({ datum }) {
	return <Tooltip.Row label="Mean score" value={datum.y.toFixed(3)} />;
};

Tooltip.ConfIntRow = function TooltipConfIntRow({ datum }) {
	return (
		<Tooltip.Row
			label="95% C.I."
			value={`(${datum.lower.toFixed(3)}, ${datum.upper.toFixed(3)})`}
		/>
	);
};

export default Tooltip;
