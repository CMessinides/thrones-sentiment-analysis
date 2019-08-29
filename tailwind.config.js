const { colors } = require("./src/theme.js");

const serifFallback = [
	"Georgia",
	"Cambria",
	"'Times New Roman'",
	"Times",
	"serif"
];

module.exports = {
	theme: {
		colors,
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
