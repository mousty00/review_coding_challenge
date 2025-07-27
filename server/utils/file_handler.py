import json
import os
from typing import List, Dict, Any


def load_json(path: str, items: List[dict]) -> None:
    with open(path) as file:
        data = json.load(file)
        for key in data:
            item_with_id = data[key].copy()  # copy to avoid modifying original
            item_with_id['id'] = key  # key added as 'id' field
            items.append(item_with_id)


def load_json_by_key(path: str, key: str) -> List[Dict[str, Any]]:
    """Load a list of dicts from a JSON file with a key wrapper."""
    if not os.path.exists(path):
        return []

    try:
        with open(path, 'r') as f:
            data = json.load(f)
            return data.get(key, [])
    except (json.JSONDecodeError, IOError):
        return []


def save_json(path: str, key: str, items: List[Dict[str, Any]]) -> bool:
    """Save a list of dicts under a key wrapper."""
    try:
        # Ensure directory exists
        os.makedirs(os.path.dirname(path), exist_ok=True)

        with open(path, 'w') as f:
            json.dump({key: items}, f, indent=4)
        return True
    except (IOError, OSError):
        return False