# This script is designed to be run interactively (i.e. python -i explore.py),
# but of course it can also be imported as a module to use its data and
# helper functions in another script.
import math

import pandas as pd

from lib.settings import DATA_DIR

raw_comments = pd.read_csv(DATA_DIR / "comments.csv")
raw_character_mentions = pd.read_csv(DATA_DIR / "character-mentions.csv")
raw_comment_sentiments = pd.read_csv(DATA_DIR / "comment-sentiments.csv")

comments = pd.merge(
    raw_comments,
    raw_comment_sentiments,
    left_on="ID",
    right_on="Comment ID",
    validate="1:1",
)
mentions = pd.merge(
    raw_comments[["ID", "Season", "Episode", "Body"]],
    raw_character_mentions,
    left_on="ID",
    right_on="Comment ID",
    validate="1:m",
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

# Aliasing the dataframes for easy interactive use
c = comments
m = mentions

# Helpful views
avg_score_by_char = (
    m.groupby("Name")
    .agg(mean=("Compound Score", "mean"), n=("Compound Score", "count"))
    .sort_values("mean")
)
weighted_avg_scores_by_char = (
    avg_score_by_char["mean"] * avg_score_by_char["n"].apply(math.log)
).sort_values()

avg_score_by_char_and_episode = pd.merge(
    agg_scores_by_character[agg_scores_by_character["n"] >= 30]
    .reset_index()
    .drop(columns=["err"]),
    total_mentions_by_episode.reset_index().rename(columns={"n": "total"}),
    on=["Season", "Episode"],
    how="inner",
).set_index(["Season", "Episode", "Name"])
avg_score_by_char_and_episode['prop'] = avg_score_by_char_and_episode["n"] / avg_score_by_char_and_episode["total"]
avg_score_by_char_and_episode['prop_mean'] = avg_score_by_char_and_episode['mean'] * avg_score_by_char_and_episode['prop']


# Helper functions
def has_character(name, series=[]):
    return [True if name in str(s) else False for s in series]


def has_length(min=0, max=math.inf, series=[]):
    if min > max:
        raise ValueError("Minimum length cannot be larger than maximum length")

    return [
        True if len(str(s)) >= min and len(str(s)) <= max else False for s in series
    ]

