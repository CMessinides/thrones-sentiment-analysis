import json
import math

import pandas as pd
from scipy import stats

from lib.settings import DATA_DIR
from lib.characters import ALL_NAMES
from lib.episodes import getSequentialEpisodeNumber

raw_comments = pd.read_csv(DATA_DIR / "comments.csv")
raw_mentions = pd.read_csv(DATA_DIR / "character-mentions.csv")
raw_sentiments = pd.read_csv(DATA_DIR / "comment-sentiments.csv")

partial_comments = raw_comments[["ID", "Season", "Episode"]]
comments = pd.merge(
    partial_comments,
    raw_sentiments,
    left_on="ID",
    right_on="Comment ID",
    validate="1:1",
)
mentions = pd.merge(
    partial_comments, raw_mentions, left_on="ID", right_on="Comment ID", validate="1:m"
)

agg_columns = {
    "mean": ("Compound Score", "mean"),
    "n": ("Compound Score", "count"),
    "err": ("Compound Score", "sem"),
}

agg_scores_overall = comments.groupby(["Season", "Episode"]).agg(**agg_columns)
agg_scores_by_character = mentions.groupby(["Name", "Season", "Episode"]).agg(
    **agg_columns
)
total_mentions_by_episode = agg_scores_by_character.groupby(
    ["Season", "Episode"]
).n.sum()

# Setup the dict to collect the mean scores as lists of dicts
means_data = {"overall": []}
for name in ALL_NAMES:
    means_data[name] = []


def create_means_entry(season, episode, mean, n, err):
    if n < 30:
        return None

    margin_of_err = stats.t.ppf(0.95, n - 1) * err

    return {
        "season": season,
        "episode": episode,
        "x": getSequentialEpisodeNumber(season, episode),
        "y": mean,
        "n": n,
        "lower": mean - margin_of_err,
        "upper": mean + margin_of_err,
    }


# Collect overall scores from all comments
for row in agg_scores_overall.itertuples(name="Row"):
    entry = create_means_entry(row[0][0], row[0][1], *row[1:])

    if entry == None:
        continue

    means_data["overall"].append(entry)

for row in agg_scores_by_character.itertuples(name="Row"):
    name = row[0][0]
    season = row[0][1]
    episode = row[0][2]
    n = row[2]

    if means_data[name] == None:
        means_data[name] = []

    entry = create_means_entry(season, episode, *row[1:])

    if entry == None:
        continue

    entry["proportion"] = n / (total_mentions_by_episode[(season, episode)])

    means_data[name].append(entry)

json.dump(means_data, open(DATA_DIR / "mean-scores.json", "w"), indent=2)

# View the average score by character
avg_score_by_char = (
    mentions.groupby("Name")
    .agg(mean=("Compound Score", "mean"), n=("Compound Score", "count"))
    .sort_values("mean")
)

# Weight the characters' average scores by the natural log of the number of mentions
weighted_avg_scores_by_char = (
    avg_score_by_char["mean"] * avg_score_by_char["n"].apply(math.log)
).sort_values()

# Export the views as CSV for the client
avg_score_by_char.to_csv(
    DATA_DIR / "avg-score-by-character.csv", index_label="name", header=True
)
weighted_avg_scores_by_char.to_csv(
    DATA_DIR / "weighted-avg-score-by-character.csv",
    index_label="name",
    header=["weigted_mean"],
)

