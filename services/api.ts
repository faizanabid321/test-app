import { Place, PlacesResponse } from '@/types/place';
import { CategoryId } from '@/constants/categories';

// Using a free public API (Foursquare API demo endpoint)
// Note: In production, you'd need an API key
const API_BASE_URL = 'https://api.foursquare.com/v3/places';

// Mock data since we don't have a real API key for demo
// In a real app, you'd make actual API calls
const MOCK_PLACES: Record<string, Place[]> = {
  'all': [
    {
      id: '1',
      name: 'Kolachi Restaurant',
      description: 'Famous sea-view restaurant serving authentic Pakistani and Continental cuisine',
      category: 'restaurant',
      rating: 4.5,
      totalRatings: 1250,
      imageUrl: 'https://picsum.photos/id/30/400/300',
      address: 'Do Darya, Karachi',
      priceLevel: 3,
      openingHours: '12:00 PM - 12:00 AM',
      phone: '+92 21 1234567',
    },
    {
      id: '2',
      name: 'Baghdad Ice Cream',
      description: 'Historic ice cream parlor since 1953, famous for its unique flavors',
      category: 'cafe',
      rating: 4.8,
      totalRatings: 3200,
      imageUrl: 'https://picsum.photos/id/20/400/300',
      address: 'Saddar, Karachi',
      priceLevel: 1,
      openingHours: '10:00 AM - 11:00 PM',
      phone: '+92 21 7654321',
    },
    {
      id: '3',
      name: 'Mohatta Palace',
      description: 'Historic palace museum showcasing art and cultural heritage',
      category: 'historical',
      rating: 4.6,
      totalRatings: 890,
      imageUrl: 'https://picsum.photos/id/96/400/300',
      address: 'Clifton, Karachi',
      openingHours: '10:00 AM - 6:00 PM (Closed Monday)',
    },
    {
      id: '4',
      name: 'Beach View Park',
      description: 'Beautiful seaside park with walking trails and picnic areas',
      category: 'park',
      rating: 4.3,
      totalRatings: 560,
      imageUrl: 'https://picsum.photos/id/15/400/300',
      address: 'Clifton Beach, Karachi',
      openingHours: '6:00 AM - 10:00 PM',
    },
    {
      id: '5',
      name: 'Dolmen Mall',
      description: 'Premium shopping mall with international and local brands',
      category: 'shopping',
      rating: 4.4,
      totalRatings: 2100,
      imageUrl: 'https://picsum.photos/id/107/400/300',
      address: 'Clifton, Karachi',
      priceLevel: 3,
      openingHours: '11:00 AM - 11:00 PM',
    },
    {
      id: '6',
      name: 'Monal Restaurant',
      description: 'Rooftop restaurant with panoramic city views',
      category: 'restaurant',
      rating: 4.7,
      totalRatings: 980,
      imageUrl: 'https://picsum.photos/id/29/400/300',
      address: 'Gulshan-e-Iqbal, Karachi',
      priceLevel: 3,
      openingHours: '12:00 PM - 1:00 AM',
    },
  ],
  'restaurant': [],
  'park': [],
  'historical': [],
  'cafe': [],
  'entertainment': [],
  'shopping': [],
  'hotel': [],
};

// Populate category-specific mock data
MOCK_PLACES['restaurant'] = MOCK_PLACES['all'].filter(p => p.category === 'restaurant');
MOCK_PLACES['park'] = MOCK_PLACES['all'].filter(p => p.category === 'park');
MOCK_PLACES['historical'] = MOCK_PLACES['all'].filter(p => p.category === 'historical');
MOCK_PLACES['cafe'] = MOCK_PLACES['all'].filter(p => p.category === 'cafe');
MOCK_PLACES['shopping'] = MOCK_PLACES['all'].filter(p => p.category === 'shopping');

export const fetchPlaces = async (category: CategoryId = 'all'): Promise<Place[]> => {
  // Simulate network delay for loading indicator demo
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate random error (10% chance) to test error handling
  const shouldError = Math.random() < 0.1;
  if (shouldError) {
    throw new Error('Network connection failed. Please check your internet and try again.');
  }
  
  const places = MOCK_PLACES[category] || MOCK_PLACES['all'];
  
  // Simulate pagination/sorting
  return places.sort((a, b) => b.rating - a.rating);
};

export const fetchPlaceById = async (id: string): Promise<Place | null> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const allPlaces = MOCK_PLACES['all'];
  const place = allPlaces.find(p => p.id === id);
  
  if (!place) {
    throw new Error('Place not found');
  }
  
  return place;
};