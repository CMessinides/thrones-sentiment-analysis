import React from "react";
import Downshift from "downshift";
import classNames from "classnames";
import CharacterVizHeader from "./CharacterVizHeader";
import CharacterChart from "./CharacterChart";

function getDomainFromScores(scores = []) {
	const yCoordinates = scores
		.reduce((coordinates, score) => {
			coordinates.push(score.y, score.lower, score.upper);
			return coordinates;
		}, [])
		.map(Math.abs);
	const yMax = yCoordinates.reduce(
		(prevMax, y) => (y > prevMax ? y : prevMax),
		0
	);
	const absDomain = parseFloat((yMax + yMax / 4).toFixed(1));
	return { y: [-absDomain, absDomain] };
}

export default function SearchableCharacterViz({
	data,
	metadata,
	searchClient,
	initialCharacter = "Tyrion Lannister"
}) {
	const [character, setCharacter] = React.useState(
		initialCharacter || "Tyrion Lannister"
	);
	const scores = data[character];
	const characterMeta = metadata.characters[character] || {};

	return (
		<div className="c-viz">
			<CharacterVizHeader name={character} thumbnail={characterMeta.thumbnail}>
				<Downshift
					onChange={(character, { setState }) => {
						if (character === null) {
							setState({ selectedItem: character });
						} else {
							setCharacter(character);
						}

						setState({ inputValue: "" });
					}}
					itemToString={item => item}
					stateReducer={(state, changes) => {
						switch (changes.type) {
							case Downshift.stateChangeTypes.clickItem:
							case Downshift.stateChangeTypes.keyDownEnter:
							case Downshift.stateChangeTypes.blurInput:
							case Downshift.stateChangeTypes.touchEnd:
							case Downshift.stateChangeTypes.mouseUp:
								return {
									...changes,
									inputValue: ""
								};
							case Downshift.stateChangeTypes.keyDownEscape:
								return {
									...changes,
									selectedItem: state.selectedItem
								};
							default:
								return changes;
						}
					}}
				>
					{({
						getInputProps,
						getItemProps,
						getLabelProps,
						getMenuProps,
						isOpen,
						inputValue,
						highlightedIndex,
						selectedItem
					}) => {
						const suggestions =
							isOpen && inputValue.trim()
								? searchClient.search(inputValue).slice(0, 5)
								: [];
						return (
							<div className="c-viz__header-search c-search">
								<label {...getLabelProps({ className: "sr-only" })}>
									Character name
								</label>
								<div className="c-search__image-container">
									<svg className="c-icon c-search__icon">
										<use href="#icon-search"></use>
									</svg>
								</div>
								<input
									{...getInputProps({
										className: classNames("c-search__input", {
											"is-open": isOpen && suggestions.length
										}),
										placeholder: "Search for a character"
									})}
								/>
								<ul {...getMenuProps({ className: "c-search__suggestions" })}>
									{isOpen
										? suggestions.map((item, index) => {
												const { thumbnail } = metadata.characters[item] || {};
												return (
													<li
														{...getItemProps({
															key: item,
															index,
															item,
															className: classNames("c-search__suggestion", {
																"is-highlighted": highlightedIndex === index,
																"is-selected": selectedItem === item
															})
														})}
													>
														{thumbnail && (
															<div className="c-search__image-container">
																<img
																	className="c-search__suggestion-image"
																	src={thumbnail}
																	alt=""
																/>
															</div>
														)}
														{item}
													</li>
												);
										  })
										: null}
								</ul>
							</div>
						);
					}}
				</Downshift>
			</CharacterVizHeader>
			<div className="c-viz__scroll-container">
				<div className="c-viz__chart-container">
					{
						<CharacterChart
							name={character}
							domain={getDomainFromScores(scores)}
							{...{ data, metadata }}
						/>
					}
				</div>
			</div>
		</div>
	);
}
