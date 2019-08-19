_episodesPerSeason = (10, 10, 10, 10, 10, 10, 7, 6)

def getSequentialEpisodeNumber(season, episode): 
		if (season == 1):
			return episode
		
		for s in reversed(range(season - 1)):
			episode += _episodesPerSeason[s]
		
		return episode
