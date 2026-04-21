export interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  totalRatings: number;
  imageUrl: string;
  address: string;
  priceLevel?: number;
  openingHours?: string;
  phone?: string;
  website?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface PlacesResponse {
  places: Place[];
  total: number;
  page: number;
}


export type SortOption = 'rating' | 'price' | 'distance';