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
  gender: string;
  image: string;
  location: LocationInfo;
  origin: OriginInfo;
}