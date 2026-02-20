export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: {
    name: string;
  };
  episode: string[];
}

export interface ApiResponse {
  info: {
    next: string | null;
  };
  results: Character[];
}
