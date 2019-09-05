<h2 id="sentiment-analysis-a-primer">Sentiment Analysis: A Primer</h2>

<aside>

If you don't need the primer, you can skip ahead to the data in the [next section](#the-big-picture).

</aside>

Sentiment analysis is a technique for understanding whether a piece of text expresses a positive, negative, or neutral sentiment. For this project, I'm using [VADER](https://github.com/cjhutto/vaderSentiment), a sentiment analyzer specifically designed for interpreting social media content, like Reddit comments. VADER takes in a sentence and then calculates a sentiment score between 1.0 (most positive) and -1.0 (most negative). For example, here's how VADER scored two real Reddit comments:
