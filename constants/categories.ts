export const categories = [
  { id: 'all', name: 'All', icon: 'apps-outline' },
  { id: 'restaurant', name: 'Restaurants', icon: 'restaurant-outline' },
  { id: 'park', name: 'Parks', icon: 'leaf-outline' },
  { id: 'historical', name: 'Historical', icon: 'business-outline' },
  { id: 'cafe', name: 'Cafes', icon: 'cafe-outline' },
  { id: 'entertainment', name: 'Entertainment', icon: 'game-controller-outline' },
  { id: 'shopping', name: 'Shopping', icon: 'cart-outline' },
  { id: 'hotel', name: 'Hotels', icon: 'bed-outline' },
] as const;

export type CategoryId = typeof categories[number]['id'];0