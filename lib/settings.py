import os
from pathlib import Path
from logging import ERROR

from dotenv import load_dotenv

_env_path = Path('..') / '.env'
load_dotenv(dotenv_path=_env_path)

REDDIT_USERNAME = os.getenv("REDDIT_USERNAME")
REDDIT_PASSWORD = os.getenv("REDDIT_PASSWORD")
REDDIT_CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
REDDIT_CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")
LOG_LEVEL = int(os.getenv("LOG_LEVEL", ERROR))
DATA_DIR = Path(os.path.dirname(__file__)) / '..' / 'data'
