import json

import pandas as pd

from lib.settings import DATA_DIR
from lib.characters import ALL_NAMES

comments = pd.read_csv(DATA_DIR / 'comments.csv')
character_mentions = pd.read_csv(DATA_DIR / 'character-mentions.csv')
comment_sentiments = pd.read_csv(DATA_DIR / 'comment-sentiments.csv')

full_comments = pd.merge(comments[['ID', 'Season', 'Episode']], comment_sentiments[['Comment ID', 'Compound']], left_on='ID', right_on='Comment ID', validate="1:1")
full_mentions = pd.merge(character_mentions, full_comments, on='Comment ID', validate="m:1")

agg_scores_overall = full_comments.groupby(['Season', 'Episode']).agg(mean_score=('Compound', 'mean'), n=('Compound', 'count'))
agg_scores_by_character = full_mentions.groupby(['Name', 'Season', 'Episode']).agg(mean_score=('Compound', 'mean'), n=('Compound', 'count'))

# Setup the dict to collect the mean scores as lists of dicts
means_data = {
	'overall': []	
}
for name in ALL_NAMES:
	means_data[name] = []

# Collect overall scores from all comments
for row in agg_scores_overall.itertuples(name="Row"):
	means_data['overall'].append({
		'season': row[0][0],
		'episode': row[0][1],
		'mean': row[1],
		'n': row[2]
	})

for row in agg_scores_by_character.itertuples(name="Row"):
	name = row[0][0]
	
	if means_data[name] == None:
		means_data[name] = []
	
	means_data[name].append({
		'season': row[0][1],
		'episode': row[0][2],
		'mean': row[1],
		'n': row[2]
	})

json.dump(means_data, open(DATA_DIR / 'mean-scores.json', 'w'), indent=2)
