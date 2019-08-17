import logging

import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer

from lib.settings import DATA_DIR, LOG_LEVEL
from lib.characters import findAllMentionedCharacters

comments = pd.read_csv(DATA_DIR / 'comments.csv')
comments['Body'] = comments['Body'].fillna('')
analyzer = SentimentIntensityAnalyzer()
logging.basicConfig(level=LOG_LEVEL)
logger = logging.getLogger(__name__)

character_mention_data = {
	'Name': [],
	'Comment ID': []
}

comment_sentiment_data = {
	'Comment ID': [],
	'Positive': [],
	'Negative': [],
	'Neutral': [],
	'Compound': []
}

for comment in comments.itertuples(name='Comment', index=False):
	id = comment[0]
	body = comment[4]
	logger.info("Processing comment {}: {}".format(id, body))

	mentions = findAllMentionedCharacters(body)

	for mention in mentions:
		logger.info("Found mention of {} in comment {}".format(mention, id))
		character_mention_data['Name'].append(mention)
		character_mention_data['Comment ID'].append(id)

	scores = analyzer.polarity_scores(body)
	logger.info("Scores for comment {}: {}".format(id, scores))
	comment_sentiment_data['Comment ID'].append(id)
	comment_sentiment_data['Positive'].append(scores['pos'])
	comment_sentiment_data['Negative'].append(scores['neg'])
	comment_sentiment_data['Neutral'].append(scores['neu'])
	comment_sentiment_data['Compound'].append(scores['compound'])

character_mentions = pd.DataFrame(character_mention_data)
comment_sentiments = pd.DataFrame(comment_sentiment_data)

character_mentions.to_csv(DATA_DIR / 'character-mentions.csv', index=False)
logger.critical("Saved {} character mentions to {}".format(len(character_mentions.index), DATA_DIR / 'character-mentions.csv'))
comment_sentiments.to_csv(DATA_DIR / 'comment-sentiments.csv', index=False)
logger.critical("Saved {} comment sentiments to {}".format(len(comment_sentiments.index), DATA_DIR / 'comment-sentiments.csv'))
