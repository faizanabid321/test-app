import { useState, useEffect, useCallback } from 'react';
import { fetchPlaces } from '@/services/api';
import { Place } from '@/types/place';
import { CategoryId } from '@/constants/categories';

interface UsePlacesReturn {
  places: Place[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  setCategory: (category: CategoryId) => void;
  currentCategory: CategoryId;
}

export const usePlaces = (initialCategory: CategoryId = 'all'): UsePlacesReturn => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<CategoryId>(initialCategory);

  const loadPlaces = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPlaces(currentCategory);
      setPlaces(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }, [currentCategory]);

  useEffect(() => {
    loadPlaces();
  }, [loadPlaces]);

  const refetch = useCallback(async () => {
    await loadPlaces();
  }, [loadPlaces]);

  const setCategory = useCallback((category: CategoryId) => {
    setCurrentCategory(category);
  }, []);

  return {
    places,
    loading,
    error,
    refetch,
    setCategory,
    currentCategory,
  };
};