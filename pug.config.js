const path = require("path");
const { readFileSync } = require("fs");
const { csvParse } = require("d3-dsv");

const rawAvgScoreByChar = readFileSync(
  path.resolve(__dirname, "data/avg-score-by-character.csv"),
  "utf8"
).toString();
const rawWeightedAvgScoreByChar = readFileSync(
  path.resolve(__dirname, "data/weighted-avg-score-by-character.csv"),
  "utf8"
).toString();
const rawCharMeta = readFileSync(
  path.resolve(__dirname, "src/static/character-meta.json"),
  "utf8"
).toString();

module.exports = {
  locals: {
    charMetadata: JSON.parse(rawCharMeta),
    avgScoreByChar: csvParse(rawAvgScoreByChar),
    weightedAvgScoreByChar: csvParse(rawWeightedAvgScoreByChar)
  }
};
