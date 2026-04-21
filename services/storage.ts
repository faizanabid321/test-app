import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'city_explorer_favorites';

export const saveFavorites = async (favorites: string[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
    console.log('Favorites saved successfully:', favorites.length);
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const loadFavorites = async (): Promise<string[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    const favorites = jsonValue != null ? JSON.parse(jsonValue) : [];
    console.log('Favorites loaded successfully:', favorites.length);
    return favorites;
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const addFavorite = async (placeId: string, currentFavorites: string[]): Promise<string[]> => {
  try {
    // Check if already exists
    if (!currentFavorites.includes(placeId)) {
      const newFavorites = [...currentFavorites, placeId];
      await saveFavorites(newFavorites);
      return newFavorites;
    }
    return currentFavorites;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return currentFavorites;
  }
};

export const removeFavorite = async (placeId: string, currentFavorites: string[]): Promise<string[]> => {
  try {
    const newFavorites = currentFavorites.filter(id => id !== placeId);
    await saveFavorites(newFavorites);
    return newFavorites;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return currentFavorites;
  }
};

export const isFavorite = (placeId: string, favorites: string[]): boolean => {
  return favorites.includes(placeId);
};