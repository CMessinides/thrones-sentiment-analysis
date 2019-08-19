import sys
import logging
from time import sleep

import praw
import pandas as pd

from lib.settings import (
    REDDIT_USERNAME,
    REDDIT_PASSWORD,
    REDDIT_CLIENT_ID,
    REDDIT_CLIENT_SECRET,
    LOG_LEVEL,
    DATA_DIR
)

logging.basicConfig(level=LOG_LEVEL)
logger = logging.getLogger(__name__)

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

    # Keep trying to load comments
    while True:
        try:
            submission.comments.replace_more()
            break
        except:
            logger.error("Unexpected error while retrieving more comments for thread {}: {}".format(submission.id, sys.exc_info()[0]))
            logger.info("Trying again to retrieve comments for thread {}...".format(submission.id))
            sleep(1)
    
    # remove any remaining "More Comments" threads
    submission.comments.replace_more(limit=0)

    comments = submission.comments.list()
    logger.info(
        "Loaded %s comments for thread %s (S%sE%s) at %s",
        len(comments),
        submission.id,
        season,
        episode,
        href,
    )

    prev_total = len(all_comments)
    for comment in comments:
        cleaned_body = " ".join(comment.body.splitlines())

        if cleaned_body in ['[deleted]', '[removed]']:
            continue

        comment_tuple = (comment.id, submission.id, season, episode, cleaned_body)
        all_comments.append(comment_tuple)

    new_total = len(all_comments)
    logger.info(
        "Added %s comments for thread %s; total comments: %s",
        new_total - prev_total,
        submission.id,
        new_total,
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
