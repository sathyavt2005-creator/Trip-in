
import { Place, Category } from './types';

export const MOCK_PLACES: Place[] = [
  {
    id: '1',
    name: 'Santorini Sunset Hotel',
    category: Category.HOTEL,
    rating: 4.8,
    description: 'Luxury hotel overlooking the Aegean Sea with stunning sunset views.',
    image: 'https://picsum.photos/seed/hotel1/800/600',
    location: 'Oia, Greece',
    pricePerNight: 450,
    amenities: ['Pool', 'WiFi', 'Breakfast', 'Sea View'],
    reviews: [
      { id: 'r1', userName: 'Alice Smith', rating: 5, comment: 'Breathtaking views!', date: '2023-10-15' }
    ]
  },
  {
    id: '2',
    name: 'The French Bistro',
    category: Category.RESTAURANT,
    rating: 4.5,
    description: 'Authentic Parisian cuisine in the heart of the city.',
    image: 'https://picsum.photos/seed/resto1/800/600',
    location: 'Paris, France',
    priceLevel: '$$$',
    cuisine: 'French',
    reviews: [
      { id: 'r2', userName: 'Bob Martin', rating: 4, comment: 'Great steak frites.', date: '2023-09-20' }
    ]
  },
  {
    id: '3',
    name: 'Tokyo Skytree',
    category: Category.ATTRACTION,
    rating: 4.7,
    description: 'One of the tallest structures in the world with a panoramic observatory.',
    image: 'https://picsum.photos/seed/attraction1/800/600',
    location: 'Tokyo, Japan',
    reviews: []
  },
  {
    id: '4',
    name: 'Grand Canyon National Park',
    category: Category.DESTINATION,
    rating: 4.9,
    description: 'Iconic geological wonder with immense hiking trails and lookouts.',
    image: 'https://picsum.photos/seed/dest1/800/600',
    location: 'Arizona, USA',
    reviews: []
  },
  {
    id: '5',
    name: 'Bali Beach Resort',
    category: Category.HOTEL,
    rating: 4.6,
    description: 'Relaxing beachfront stay with tropical gardens.',
    image: 'https://picsum.photos/seed/hotel2/800/600',
    location: 'Bali, Indonesia',
    pricePerNight: 120,
    amenities: ['Spa', 'WiFi', 'Beach Access'],
    reviews: []
  },
  {
    id: '6',
    name: 'Sushi Zen',
    category: Category.RESTAURANT,
    rating: 4.9,
    description: 'Premium Omakase experience with the freshest catch.',
    image: 'https://picsum.photos/seed/resto2/800/600',
    location: 'Kyoto, Japan',
    priceLevel: '$$$$',
    cuisine: 'Japanese',
    reviews: []
  }
];

export const CATEGORIES = [
  { name: 'Hotels', icon: '🏨', value: Category.HOTEL },
  { name: 'Restaurants', icon: '🍽️', value: Category.RESTAURANT },
  { name: 'Attractions', icon: '🏛️', value: Category.ATTRACTION },
  { name: 'Destinations', icon: '🌎', value: Category.DESTINATION },
];
