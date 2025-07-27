from enum import Enum
from pathlib import Path
import os

class DataFiles(Enum):
    """Enum for data file paths used in the application."""

    BUSINESSES = './data/businesses.json'
    INTERACTIONS = './data/interactions.json'
    SUBMISSIONS = './data/submissions.json'

    def __str__(self) -> str:
        """Return the file path as string."""
        return self.value

    @property
    def path(self) -> Path:
        """Return the file path as a Path object."""
        return Path(self.value)

    @property
    def exists(self) -> bool:
        """Check if the file exists."""
        return os.path.exists(self.value)