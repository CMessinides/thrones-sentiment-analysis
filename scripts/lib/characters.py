import json
import re
from functools import reduce

from .settings import DATA_DIR

_characters = json.load(open(DATA_DIR / 'characters.json', 'r'))

_all_aliases = {}
_case_required_aliases = []
_case_optional_aliases = []
for name, aliases in _characters.items():
	_case_required_aliases.extend(aliases['caseSensitive'])
	_case_optional_aliases.extend(aliases['caseInsensitive'])
	combined_aliases = map((lambda s: s.lower()), aliases['caseSensitive'] + aliases['caseInsensitive'])
	for alias in combined_aliases:
		_all_aliases[alias] = name

_case_required_pattern = re.compile(r'(?:\W|^)(' + '|'.join(_case_required_aliases) + r')(?:s|\W|$)')
_case_optional_pattern = re.compile(r'(?:\W|^)(' + '|'.join(_case_optional_aliases) + r')(?:s|\W|$)', re.IGNORECASE)

ALL_NAMES = list(_characters.keys())

def findAllMentionedCharacters(text):
	matches = _case_required_pattern.findall(text) + _case_optional_pattern.findall(text)
	canonical_matches = map((lambda m: _all_aliases[m.lower()]), matches)
	unique_matches = list(set(canonical_matches))
	return unique_matches
