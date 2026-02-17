export interface ApiInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface ApiResponse<T> {
    info: ApiInfo;
    results: T[];
}

export interface Character {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin: { name: string; url: string };
    location: { name: string; url: string };
    image: string;
    episode: string[];
    created: string;
}