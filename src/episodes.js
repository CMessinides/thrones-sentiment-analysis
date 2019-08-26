// This array contains the absolute episode numbers of every
// season premiere, along with the series finale. These are
// our "landmark" episodes because they are always visible on
// the x-axis.
const landmarkEpisodes = [1, 11, 21, 31, 41, 51, 61, 68, 73];
export function isLandmarkEpisode(n) {
	return landmarkEpisodes.includes(n);
}

const episodesInSeason = [10, 10, 10, 10, 10, 10, 7, 6];

// Given an absolute episode number, return the season and relative
// episode number
export function getSeasonAndEpisode(n) {
	if (n > 73 || n < 1) {
		throw new TypeError("Episode number is invalid; must be between 1 and 73.");
	}

	let epsRemaining = n;
	for (let season = 0; season < episodesInSeason.length; season++) {
		if (epsRemaining <= episodesInSeason[season]) {
			return [season + 1, epsRemaining];
		}

		epsRemaining -= episodesInSeason[season];
	}
}
