<h2 id="sentiment-analysis-a-primer">Sentiment Analysis: A Primer</h2>

<aside>

If you don't need the primer, you can skip ahead to the data in the [next section](#the-big-picture).

</aside>

Sentiment analysis is a technique for understanding whether a piece of text expresses a positive, negative, or neutral sentiment. For this project, I'm using [VADER](https://github.com/cjhutto/vaderSentiment), a sentiment analyzer specifically designed for interpreting social media content, like Reddit comments. VADER takes in a sentence and then calculates a sentiment score between 1.0 (most positive) and -1.0 (most negative).

<aside>

Case in point: an earlier draft of this essay included Ghost, Jon's direwolf, as a character &mdash; that was, until I checked the results and found that on average, sentences that mentioned Ghost were by far the most negative of any character. That's because the word "ghost" has [a moderately negative sentiment rating of -1.3 in VADER](https://github.com/cjhutto/vaderSentiment/blob/b045da3c5a29ed130777a16dc78588f53da54a05/vaderSentiment/vader_lexicon.txt#L3254).

In an ideal world, I would use a sentiment analyzer tuned to the language of <cite>Game of Thrones</cite>, where "Ghost" could be a neutral word, but I have neither the expertise nor the resources to create such a tool. VADER works well enough for 99 percent of characters in the series, but unfortunately for Ghost, [we'll have to leave our dear direwolf behind](https://youtu.be/8JFwkRcpukk?t=173) for this project.

</aside>
