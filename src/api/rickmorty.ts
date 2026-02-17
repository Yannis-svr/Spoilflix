import type { Character, ApiResponse } from '../type/api';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchCharacters(page: number): Promise<ApiResponse<Character>> {
    const response = await fetch(`${BASE_URL}/character?page=${page}`);

    if (!response.ok) {
        throw new Error(`Erreur ${response.status} : ${response.statusText}`);
    }

    return await response.json() as Promise<ApiResponse<Character>>;
}