import type { Character } from '../type/api';

export type SortCriteria = 'id-asc' | 'name-asc' | 'name-desc' | 'episodes-desc' | 'episodes-asc';

export function sortCharacters(characters: Character[], criteria: SortCriteria): Character[] {
  const copy = [...characters];

  switch (criteria) {
    case 'name-asc':
      return copy.sort((a, b) => a.name.localeCompare(b.name));

    case 'name-desc':
      return copy.sort((a, b) => b.name.localeCompare(a.name));

    case 'episodes-desc':
      return copy.sort((a, b) => b.episode.length - a.episode.length);

    case 'episodes-asc':
      return copy.sort((a, b) => a.episode.length - b.episode.length);

    case 'id-asc':
    default:
      return copy.sort((a, b) => a.id - b.id);
  }
}
