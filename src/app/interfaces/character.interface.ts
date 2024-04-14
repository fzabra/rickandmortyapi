export interface LocationInfo {
  name: string;
}

export interface OriginInfo {
  name: string;
}

export interface TypeCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: LocationInfo;
  location: LocationInfo;
  image: string;
  episode: string[];
  url: string;
  created: string;
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}