import os
import logging
from pathlib import Path

import praw
import pandas as pd

from lib.settings import (
    REDDIT_USERNAME,
    REDDIT_PASSWORD,
    REDDIT_CLIENT_ID,
    REDDIT_CLIENT_SECRET,
    LOG_LEVEL,
)

DATA_DIR = Path(os.path.dirname(__file__)) / "data"

logger = logging.getLogger(__name__)
logger.basicConfig(level=LOG_LEVEL)

reddit = praw.Reddit(
    username=REDDIT_USERNAME,
    password=REDDIT_PASSWORD,
    client_id=REDDIT_CLIENT_ID,
    client_secret=REDDIT_CLIENT_SECRET,
    user_agent="Thrones Sentiment Analyzer by /u/IncandescentChutney",
)

all_threads = pd.read_csv(DATA_DIR / "threads.csv")
logger.info(
    "Loaded %s threads from %s", len(all_threads.index), str(DATA_DIR / "threads.csv")
)

all_comments = []
for thread in all_threads.itertuples():
    href = thread[2]
    episode = thread[1]
    season = thread[3]

    submission = praw.models.Submission(reddit, url=href)
    submission.comments.replace_more(limit=0)
    logger.info(
        "Loaded comments for thread %s (S%sE%s) at %s",
        submission.id,
        season,
        episode,
        href,
    )

    for comment in submission.comments.list():
        cleaned_body = " ".join(comment.body.splitlines())
        comment_tuple = (comment.id, submission.id, season, episode, cleaned_body)
        all_comments.append(comment_tuple)

    logger.info(
        "Added comments for thread %s; total comments: %s",
        submission.id,
        len(all_comments),
    )

comments_frame = pd.DataFrame(
    all_comments, columns=("ID", "Thread ID", "Season", "Episode", "Body")
)
comments_frame.to_csv(DATA_DIR / "comments.csv", index=False)
logger.critical(
    "Successfully saved %s comments in %s",
    len(comments_frame.index),
    str(DATA_DIR / "comments.csv"),
)
