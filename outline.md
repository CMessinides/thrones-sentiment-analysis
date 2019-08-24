# The Game of Thrones Characters that Fans Love (to Hate)

-intro
	- hook
		- ever wondered which character on Game of Thrones earned the most fan hatred?
			- Joffrey? Melisandre? Littlefinger?
		- how about the most beloved characters?
			- Arya? Tyrion? Pod the Rod?
	- personal motivation
		- i did
			- arrived late to the game
			- wanted to know how other fans felt watching these character arcs unfold in real time
		- i wondered: how did fan responses to major characters change as the series went along?
	- the answer
		- thankfully, i could turn to a massive, years-old archive of GoT fan talk: Reddit comments
		- describe three subreddits and their episode discussion threads
		- scraped 300,000 comments and conducted a sentiment analysis
- what is sentiment analysis
	- A Cautionary Tale

		An earlier draft of this essay included Ghost, Jon&rsquo;s direwolf, as a character &mdash; that was, until I checked the results and found that on average, sentences that mentioned Ghost were by far the most negative of any character. I was surprised, given that Ghost is a beloved figure on the Internet and the subject of [many]() [adoring]() [memes](). I took a closer look at the comments mentioning Ghost, but saw nothing out of the ordinary. There were many &ldquo;RIP Ghost&rdquo; and &ldquo;GHOST NO&rdquo; comments (disclaimer: Ghost is alive and well), but many other characters had their fair share of similar mentions. So what was causing Ghost&rsquo;s scores to tank?

		That&rsquo;s when I realized that, unlike many other characters in <cite>Game of Thrones</cite>, Ghost&rsquo;s name is an English word, and a word likely to have negative associations at that. Sure enough, the word &ldquo;ghost&rdquo; has [a moderately negative sentiment rating of -1.3 in VADER](https://github.com/cjhutto/vaderSentiment/blob/b045da3c5a29ed130777a16dc78588f53da54a05/vaderSentiment/vader_lexicon.txt#L3254).

		The moral of the story: Be careful when using a generic sentiment analysis tool like VADER for text from a specific domain, like *Game of Thrones*. Few words have the same weight and meaning in all contexts. 
		
		In an ideal world, I would use a sentiment analyzer tuned to the language of *Game of Thrones*, where &ldquo;Ghost&rdquo; could be a neutral word, but I have neither the expertise nor the resources to create such a tool. VADER works well enough for 99% of characters in the series, but unfortunately for Ghost, [we&rsquo;ll have to leave our favorite direwolf behind](https://youtu.be/8JFwkRcpukk?t=173) for this project.
	- ! example comments with scores
- the sentiments overall
	- ! overall chart w/ highlights
- sentiments filtered by character
	- ! interactive character chart
