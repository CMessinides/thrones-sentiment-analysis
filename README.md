# Cripples, Bastards, and Sentiment Analysis

<div style="background-color:#ffd97d;color:#6d4511;padding:0.5em 2em;border:1px currentColor solid;border-radius:8px">

**WARNING**: This README and this repository contain spoilers for the *Game of Thrones* television series.

</div>

Can we understand how fan responses to characters from HBO&rsquo;s [*Game of Thrones*](https://www.hbo.com/game-of-thrones) changed over time by analyzing their Reddit comments? This repository contains scripts and data files from my attempt to answer that question.

## Table of Contents

- [User Guide](#heading-user-guide)
	- [Requirements](#heading-requirements)
	- [Installation](#heading-installation)
	- [Configuration](#heading-config)
	- [Running scripts](#heading-running-scripts)
- [Project Overview](#heading-overview)
	- [Datasets](#heading-data)
	- [Scripts](#heading-scripts)
- [Citations](#heading-citations)
- [License](#heading-license)

<h2 id="heading-user-guide">User Guide</h2>

<h3 id="heading-requirements">Requirements</h3>

This project requires that you have the following software installed on your system:

- Git
- Python ≥ 3.7
- [Pipenv](https://github.com/pypa/pipenv)

In addition, the following software is recommended for using some of the project&rsquo;s optional features:

- [yarn](https://github.com/yarnpkg/yarn) for running scripts and managing JavaScript dependencies
- [R](https://www.r-project.org/) and [RStudio](https://www.rstudio.com/) for quickly analyzing the data and making visualizations

<h3 id="heading-installation">Installation</h3>

Clone this repository using Git:

```bash
$ git clone https://github.com/CMessinides/thrones-sentiment-analysis.git
```

Then navigate into the project directory:

```bash
$ cd thrones-sentiment-analysis
```

Use Pipenv to install Python dependencies:

```bash
$ pipenv install --dev
```

Use Yarn (or npm) to install JavaScript dependencies:

```bash
$ yarn install
# npm install
```

<h3 id="heading-config">Configuration</h3>

If you plan on scraping comments with `scripts/scrape.py` (see [&ldquo;Scripts&rdquo;](#heading-scripts)), you will have to configure authentication for the Reddit API.

First, you will need to to register a [script app](https://github.com/reddit-archive/reddit/wiki/OAuth2-App-Types#script) through your Reddit account. You can find instructions [here](https://github.com/reddit-archive/reddit/wiki/OAuth2-Quick-Start-Example#first-steps). Be sure to note your app's client ID and client secret when you are done.

Next, create a `.env` file in the root project directory. Add your Reddit username and password, along with the client ID and secret for the app you created earlier, as variables:

```bash
# .env
REDDIT_USERNAME= # your username
REDDIT_PASSWORD= # your password
REDDIT_CLIENT_ID= # your client ID
REDDIT_CLIENT_SECRET= # your client secret
```

You can optionally add a `LOG_LEVEL` variable to this file to configure logging in your Python scripts ([list of Python log levels](https://docs.python.org/3/library/logging.html#logging-levels)). `LOG_LEVEL=20` will give you detailed logs for debugging or monitoring the progress of this project's Python scripts.

```bash
# .env
LOG_LEVEL=20 # INFO
```

<h3 id="heading-running-scripts">Running scripts</h3>

For convenience, you can use Yarn or npm as a script runner for the Python scripts. You can run all scripts in sequence or each individually.

```bash
# Run scripts/scrape.py (WARNING: This is slow!)
yarn scripts:scrape

# Run scripts/analyze.py
yarn scripts:analyze

# Run scripts/transform.py
yarn scripts:transform

# Run all scripts in sequence
yarn scripts:all
```

You can also run the Python scripts directly using Pipenv (ex. `pipenv run python scrape.py`).

<h2 id="heading-overview">Project Overview</h2>

<h3 id="heading-data">

Datasets (`./data`)

</h3>

- **`comments.csv`** contains the corpus of Reddit comments used for this analysis. There are approximately 300,000 comments from episode discussion threads posted in three *Game of Thrones*-related subreddits: [/r/gameofthrones](https://www.reddit.com/r/gameofthrones) (all seasons), [r/asoiaf](https://www.reddit.com/r/asoiaf) (all seasons), and [/r/freefolk](https://wwww.reddit.com/r/freefolk) (Season 8 only). This data is collected automatically by `scripts/scrape.py` (see [&ldquo;Scripts&rdquo;](#heading-scripts)).

- **`threads.csv`** contains the list of episode discussion threads to scrape for comments. This data is updated by hand.

- **`characters.json`** contains the list of *Game of Thrones* characters to search for in the comments. The list includes the characters&rsquo; canonical (i.e. &ldquo;real&rdquo;) names and any corresponding aliases (first names, nicknames, common misspellings, etc.) they might go by. This data is updated by hand.

- **`comment-sentiments.csv`** records the sentiment analysis score of each comment. This score is calculated using [VADER](https://github.com/cjhutto/vaderSentiment), a sentiment analysis tool designed specifically for social media content like Reddit comments. Each row includes the comment ID along with the compound sentiment score output by VADER. This data is updated automatically by `scripts/analyze.py` (see [&ldquo;Scripts&rdquo;](#heading-scripts)).

- **`character-mentions.csv`** records every mention of a character in the corpus of comments. Each row includes the character&rsquo;s canonical name, the ID of the comment that contains the mention, the sentence in the comment that mentions the character, and the compound sentiment score for that sentence. This data is updated automatically by `scripts/analyze.py` (see [&ldquo;Scripts&rdquo;](#heading-scripts)).

- **`mean-scores.json`** records the mean compound sentiment score of every episode, both overall and by character. It also contains confidence intervals for each mean, and for each episode, it includes the proportion of total character mentions that went to each character (with at least 30 mentions). This data is updated automatically by `scripts/transform.py` (see [&ldquo;Scripts&rdquo;](#heading-scripts)).

<h3 id="heading-scripts">

Scripts (`./scripts`)

</h3>

- **`scrape.py`** uses the Reddit API to collect comments from the episode discussion threads in `data/threads.csv` (see [&ldquo;Datasets&rdquo;](#heading-data)). Note that due to time and storage limitations, this script does not collect all comments from every thread. This script is responsible for updating the corpus of comments in `data/comments.csv`.

- **`analyze.py`** uses VADER to calculate sentiment scores from all the scraped comments as well as from any sentence in those comments which mentions one of the characters in `data/characters.json` (see [&ldquo;Datasets&rdquo;](#heading-data)). This script is responsible for updating the records in `data/comment-sentiments.csv` and `data/character-mentions.csv`.

- **`transform.py`** uses the prior sentiment analysis to produce a data file with mean scores, confidence intervals, and mention proportions for the client visualization/interactive. This script is responsible for updating `data/mean-scores.json` (see [&ldquo;Datasets&rdquo;](#heading-data)).

<h2 id="heading-citations">Citations</h2>

Hutto, C.J. & Gilbert, E.E. (2014). VADER: A Parsimonious Rule-based Model for Sentiment Analysis of Social Media Text. Eighth International Conference on Weblogs and Social Media (ICWSM-14). Ann Arbor, MI, June 2014.

<h2 id="heading-license">License</h2>

The datasets in this repository are available under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/), and the code is available under the [MIT License](https://opensource.org/licenses/MIT).
