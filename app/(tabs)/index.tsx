import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlaces } from '@/hooks/usePlaces';
import { useFavorites } from '@/hooks/useFavorites';
import { PlaceCard } from '@/components/PlaceCard';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorMessage } from '@/components/ErrorMessage';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SortOptions } from '@/components/SortOptions';
import { colors } from '@/constants/colors';
import { Place, SortOption } from '@/types/place';
import { getCurrentLocation, UserLocation, calculateDistance } from '@/services/location';

export default function DiscoverScreen() {
  const { places, loading, error, refetch, setCategory, currentCategory } = usePlaces();
  const { favorites } = useFavorites();
  const [sortedPlaces, setSortedPlaces] = useState<Place[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    sortPlaces();
  }, [places, sortBy, userLocation]);

  const sortPlaces = () => {
    let sorted = [...places];

    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        sorted.sort((a, b) => (a.priceLevel || 0) - (b.priceLevel || 0));
        break;
      case 'distance':
        if (userLocation) {
          sorted.sort((a, b) => {
            const distA = a.coordinates ? calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              a.coordinates.lat,
              a.coordinates.lng
            ) : Infinity;
            const distB = b.coordinates ? calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              b.coordinates.lat,
              b.coordinates.lng
            ) : Infinity;
            return distA - distB;
          });
        }
        break;
    }

    setSortedPlaces(sorted);
  };

  const handleGetLocation = async () => {
    setLocationLoading(true);
    try {
      const location = await getCurrentLocation();
      if (location) {
        setUserLocation(location);
        setSortBy('distance');
        Alert.alert('Success', 'Location found! Showing nearest places first.');
      } else {
        Alert.alert('Error', 'Unable to get location. Please enable location services.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get location.');
    } finally {
      setLocationLoading(false);
    }
  };

  if (loading && places.length === 0) {
    return <LoadingIndicator />;
  }

  if (error && places.length === 0) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      {/* Category Bar - Fixed at top */}
      <View style={styles.categoryWrapper}>
        <CategoryFilter
          selectedCategory={currentCategory}
          onSelectCategory={setCategory}
        />
      </View>
      
      {/* Sort Bar */}
      <View style={styles.sortWrapper}>
        <View style={styles.sortContainer}>
          <SortOptions
            selectedSort={sortBy}
            onSelectSort={setSortBy}
            showDistance={!!userLocation}
          />
        </View>
        <TouchableOpacity
          style={[styles.locationButton, locationLoading && styles.locationButtonDisabled]}
          onPress={handleGetLocation}
          disabled={locationLoading}
        >
          <Ionicons
            name={userLocation ? "navigate" : "location-outline"}
            size={20}
            color={userLocation ? colors.success : colors.primary}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedPlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          let distance = undefined;
          if (userLocation && item.coordinates) {
            distance = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              item.coordinates.lat,
              item.coordinates.lng
            );
          }
          return (
            <PlaceCard
              place={item}
              showDistance={sortBy === 'distance' && !!distance}
              distance={distance}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  categoryWrapper: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sortWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingRight: 8,
  },
  sortContainer: {
    flex: 1,
  },
  locationButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  locationButtonDisabled: {
    opacity: 0.5,
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 16,
  },
});