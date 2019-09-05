module.exports = {
	content: ["**/*.pug", "./src/*.jsx"],
	defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
	whitelist: [
		// To keep normalize styles in, even if they don't appear in the markup
		"blockquote",
		"dl",
		"dd",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"hr",
		"figure",
		"p",
		"pre",
		"ol",
		"ul"
	]
};
