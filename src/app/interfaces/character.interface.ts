export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Character {
  id: number;
  name: string;
  gender: string;
  image: string;
  species: string;
  status: string;
}

export interface CharacterPlace {
  name: string;
  url: string;
}

export interface CharacterDetails extends Character {
  type: string;
  origin: CharacterPlace;
  location: CharacterPlace;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface CharacterApiResponse {
  info: ApiInfo;
  results: Character[];
}

export interface FavoriteCharacter {
  id: number;
  name: string;
  gender: string;
  image: string;
}
