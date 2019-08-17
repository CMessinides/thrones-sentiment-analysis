import json
import os
import re
from functools import reduce

_filename = os.path.join(os.path.dirname(__file__), '../select-characters.json');
_characters = json.load(open(_filename, 'r'));

def _createAliasDict(dict, name):
	aliases = _characters[name]
	if len(aliases) == 0:
		aliases = [name]

	for alias in aliases:
		dict[alias] = name

	return dict

ALIASES = reduce(_createAliasDict, list(_characters.keys()), {});
ALIAS_PATTERN = re.compile('(' + '|'.join(list(ALIASES.keys())) + r')(?!\w)');
