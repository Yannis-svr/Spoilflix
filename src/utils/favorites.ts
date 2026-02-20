const STORAGE_KEY = 'rickmorty_favorites';

export function loadFavorites(): Set<number> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return new Set<number>();
        const parsed: unknown = JSON.parse(raw);
        if (!Array.isArray(parsed)) return new Set<number>();
        return new Set<number>(parsed.filter((x): x is number => typeof x === 'number'));
    } catch {
        return new Set<number>();
    }
}

export function saveFavorites(favorites: Set<number>): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
    } catch {
        console.error('Failed to save favorites');
    }
}

export function toggleFavorite(favorites: Set<number>, id: number): Set<number> {
    const next = new Set<number>(favorites);
    if (next.has(id)) {
        next.delete(id);
    } else {
        next.add(id);
    }
    return next;
}