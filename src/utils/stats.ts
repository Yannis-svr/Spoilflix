import type { Character } from '../type/api';

export interface Stats {
    totalDisplayed: number;
    favoritesCount: number;
    avgEpisodes: number;
    aliveCount: number;
    deadCount: number;
}

export function computeStats(characters: Character[], favorites: Set<number>): Stats {
    const totalDisplayed = characters.length;
    const favoritesCount = favorites.size;

    const avgEpisodes =
        totalDisplayed === 0
            ? 0
            : Math.round(
                characters.reduce((sum, c) => sum + c.episode.length, 0) / totalDisplayed
            );

    const aliveCount = characters.filter((c) => c.status === 'Alive').length;
    const deadCount = characters.filter((c) => c.status === 'Dead').length;

    return { totalDisplayed, favoritesCount, avgEpisodes, aliveCount, deadCount };
}