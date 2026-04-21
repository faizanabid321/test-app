import { useState, useEffect, useCallback } from 'react';
import { loadFavorites, addFavorite, removeFavorite, isFavorite } from '@/services/storage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavoritesData();
  }, []);

  const loadFavoritesData = async () => {
    try {
      setLoading(true);
      const favs = await loadFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error in loadFavoritesData:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = useCallback(async (placeId: string) => {
    try {
      let newFavorites;
      const isFav = isFavorite(placeId, favorites);
      
      if (isFav) {
        newFavorites = await removeFavorite(placeId, favorites);
      } else {
        newFavorites = await addFavorite(placeId, favorites);
      }
      
      setFavorites(newFavorites);
      return newFavorites;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return favorites;
    }
  }, [favorites]);

  const checkIsFavorite = useCallback((placeId: string) => {
    return isFavorite(placeId, favorites);
  }, [favorites]);

  return {
    favorites,
    loading,
    toggleFavorite,
    checkIsFavorite,
  };
};