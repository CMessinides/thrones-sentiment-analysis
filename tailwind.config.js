const serifFallback = [
	"Georgia",
	"Cambria",
	"'Times New Roman'",
	"Times",
	"serif"
];

module.exports = {
	theme: {
		fontFamily: {
			body: ["Alegreya", ...serifFallback],
			heading: ["Eczar", ...serifFallback]
		},
		extend: {
			screens: {
				sm: "30em"
			}
		}
	},
	variants: {},
	plugins: []
};
