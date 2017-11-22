"""
Tools to update manifest.json with new version number
"""
import sys

import json

from pathlib import Path

version = sys.argv[1]
manifest = Path('manifest.json')

with manifest.open('r') as f:
    data = json.loads(f.read())
    data['version'] = version

with manifest.open('w') as f:
    f.write(json.dumps(data, indent=2))
