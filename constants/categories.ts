export const categories = [
  { id: 'all', name: 'All', icon: 'view-dashboard' },
  { id: 'restaurant', name: 'Restaurants', icon: 'silverware-fork-knife' },
  { id: 'park', name: 'Parks', icon: 'tree' },
  { id: 'historical', name: 'Historical', icon: 'castle' },
  { id: 'cafe', name: 'Cafes', icon: 'coffee' },
  { id: 'entertainment', name: 'Entertainment', icon: 'gamepad-variant' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping' },
  { id: 'hotel', name: 'Hotels', icon: 'hotel' },
] as const;

export type CategoryId = typeof categories[number]['id'];