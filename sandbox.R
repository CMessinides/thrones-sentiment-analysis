library(jsonlite)
library(scales)

scores <- fromJSON('data/mean-scores.json', flatten = T)

episodesPerSeason <- c(10, 10, 10, 10, 10, 10, 7, 6)
episodeLabels <- unlist(mapply(function(count, season) {
  lapply(seq(1, count), function(episode) {
    sprintf("S%sE%s", season, episode)
  })
}, episodesPerSeason, seq(1, length(episodesPerSeason))), recursive = T)

getEpisodeNumber <- function(season, episode) {
  numPrevSeasons <- season - 1;
  
  if (numPrevSeasons == 0) {
    return(episode)
  }
  
  for (i in seq(numPrevSeasons, 1)) {
    episode <- episode + episodesPerSeason[i] 
  }
  
  return(episode)
}

labelAt <- sapply(seq(1, length(episodesPerSeason)), function(s) { getEpisodeNumber(s, 1) })
labelAt <- append(labelAt, getEpisodeNumber(8, 6))

plotSentimentScores <- function(name) {
  data <- scores[[name]]
  overall <- scores[['overall']]
  print(data)
  x <- data$x
  y <- data$y
  ci_lower <- data$lower
  ci_upper <- data$upper
  plot(x, y, xaxt="n", type="n", xlim=c(1, 73), ylim=c(-0.5,0.5), xlab="Episode", ylab="Sentiment Score", main=sprintf("Reddit comment sentiments for %s", name))
  axis(side=1, at=labelAt, labels=episodeLabels[labelAt])
  abline(v=labelAt, col=alpha("gray", 0.5))
  abline(v=which(!(1:73 %in% labelAt)), col=alpha("gray", 0.15))
  polygon(c(1:73, 73:1), c(overall$upper, rev(overall$lower)), col=alpha("gray", 0.33), border=NA)
  lines(1:73, overall$y, col="gray", lwd=2)
  segments(x, ci_lower, x, ci_upper, col="red")
  points(x, y, pch=19, cex=data$proportion * 25, col=alpha("red", 0.15))
  points(x, y, pch=20, cex=1, col="red")
}
