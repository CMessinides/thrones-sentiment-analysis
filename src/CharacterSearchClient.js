import lunr from "lunr";

export default class CharacterSearchClient {
	constructor(data = {}) {
		const characters = Object.keys(data)
			.filter(name => name !== "overall")
			.map(name => ({
				name
			}));

		this.index = lunr(function() {
			this.ref("name");
			this.field("name");

			for (const char of characters) {
				this.add(char);
			}
		});
	}

	search(query) {
		const cleanQuery = query.trim().replace(/[^a-z\s]+/i, "");

		if (!cleanQuery) return [];

		return this.index
			.search(
				cleanQuery
					.split(/\s+/)
					.map(term => term + "*")
					.join(" ")
			)
			.map(result => result.ref);
	}
}
