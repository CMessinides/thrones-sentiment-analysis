import json
import re
from functools import reduce

from .settings import DATA_DIR

_characters = json.load(open(DATA_DIR / 'characters.json', 'r'))

def _createAliasDict(dict, name):
	aliases = _characters[name]
	if len(aliases) == 0:
		aliases = [name]

	for alias in aliases:
		dict[alias] = name

	return dict

ALL_NAMES = list(_characters.keys())
ALIASES = reduce(_createAliasDict, list(_characters.keys()), {})
ALIAS_PATTERN = re.compile('(' + '|'.join(list(ALIASES.keys())) + r')(?!\w)')

def findAllMentionedCharacters(text):
	matches = ALIAS_PATTERN.findall(text)
	canonical_matches = map((lambda m: ALIASES[m]), matches)
	unique_matches = list(set(canonical_matches))
	return unique_matches
