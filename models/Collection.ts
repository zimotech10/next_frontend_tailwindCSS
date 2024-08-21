export interface Collection {
  id: number;
  name: string;
  logoImage?: string;
  coverImage?: string;
  symbol?: string;
  description: string;
  floor?: string;
  average?: string;
  isVerified: boolean;
  items?: number;
  owners?: number;
  gridType?: number;
}

export interface Collection2 {
  id: number;
  name: string;
  symbol: string;
  dateCreated: string;
  collectionId: string;
  totalItems: number;
  status: string;
  baseImage: string;
  logoImage: string;
  description: string;
  isVerified: boolean;
  floor: string;
  monthFloor: string;
}
