import logging

import pandas as pd
from nltk import tokenize
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
	'Comment ID': [],
	'Sentence': [],
	'Compound Score': []
}

comment_sentiment_data = {
	'Comment ID': [],
	'Compound Score': []
}

for comment in comments.itertuples(name='Comment', index=False):
	id = comment[0]
	body = comment[4]
	logger.info("Processing comment {}: {}".format(id, body))

	sentence_list = tokenize.sent_tokenize(body)
	comment_scores = []
	for sentence in sentence_list:
		score = analyzer.polarity_scores(sentence)
		comment_scores.append(score['compound'])

		mentions = findAllMentionedCharacters(sentence)
		for mention in mentions:
			logger.info("Found mention of {} in comment {}. Sentence: {}".format(mention, id, sentence))
			character_mention_data['Name'].append(mention)
			character_mention_data['Comment ID'].append(id)
			character_mention_data['Sentence'].append(sentence)
			character_mention_data['Compound Score'].append(score['compound'])

	mean_comment_score = pd.np.mean(comment_scores) if len(comment_scores) != 0 else 0.0
	logger.info("Scores for comment {}: {}".format(id, mean_comment_score))
	comment_sentiment_data['Comment ID'].append(id)
	comment_sentiment_data['Compound Score'].append(mean_comment_score)

character_mentions = pd.DataFrame(character_mention_data)
comment_sentiments = pd.DataFrame(comment_sentiment_data)

character_mentions.to_csv(DATA_DIR / 'character-mentions.csv', index=False)
logger.critical("Saved {} character mentions to {}".format(len(character_mentions.index), DATA_DIR / 'character-mentions.csv'))
comment_sentiments.to_csv(DATA_DIR / 'comment-sentiments.csv', index=False)
logger.critical("Saved {} comment sentiments to {}".format(len(comment_sentiments.index), DATA_DIR / 'comment-sentiments.csv'))
