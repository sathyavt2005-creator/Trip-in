
export enum Category {
  HOTEL = 'Hotel',
  RESTAURANT = 'Restaurant',
  ATTRACTION = 'Attraction',
  DESTINATION = 'Destination'
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Place {
  id: string;
  name: string;
  category: Category;
  rating: number;
  description: string;
  image: string;
  location: string;
  priceLevel?: string; // e.g., "$$", "$$$"
  pricePerNight?: number;
  cuisine?: string;
  amenities?: string[];
  reviews: Review[];
}

export interface TripPlan {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  places: Place[];
}
