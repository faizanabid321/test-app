import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchPlaceById } from '@/services/api';
import { Place } from '@/types/place';
import { RatingStars } from '@/components/RatingStars';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorMessage } from '@/components/ErrorMessage';
import { colors } from '@/constants/colors';

export default function PlaceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPlace();
  }, [id]);

  const loadPlace = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPlaceById(id);
      setPlace(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load place details');
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    if (place?.phone) {
      Linking.openURL(`tel:${place.phone}`);
    }
  };

  const handleWebsite = () => {
    if (place?.website) {
      Linking.openURL(place.website);
    }
  };

  const handleDirections = () => {
    if (place?.coordinates) {
      Linking.openURL(
        `https://maps.google.com/?q=${place.coordinates.lat},${place.coordinates.lng}`
      );
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error || !place) {
    return <ErrorMessage message={error || 'Place not found'} onRetry={loadPlace} />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: place.imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name}>{place.name}</Text>
        
        <View style={styles.ratingRow}>
          <RatingStars rating={place.rating} size={20} />
          <Text style={styles.ratingText}>
            {place.rating} ({place.totalRatings} reviews)
          </Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color={colors.primary} />
            <Text style={styles.infoText}>{place.address}</Text>
          </View>
          
          {place.category && (
            <View style={styles.infoItem}>
              <Ionicons name="pricetag-outline" size={20} color={colors.primary} />
              <Text style={styles.infoText}>
                {place.category.charAt(0).toUpperCase() + place.category.slice(1)}
              </Text>
            </View>
          )}
          
          {place.openingHours && (
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={20} color={colors.primary} />
              <Text style={styles.infoText}>{place.openingHours}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{place.description}</Text>
        </View>

        <View style={styles.actionButtons}>
          {place.phone && (
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
              <Ionicons name="call-outline" size={24} color={colors.white} />
              <Text style={styles.actionButtonText}>Call</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.actionButton} onPress={handleDirections}>
            <Ionicons name="navigate-outline" size={24} color={colors.white} />
            <Text style={styles.actionButtonText}>Directions</Text>
          </TouchableOpacity>
          
          {place.website && (
            <TouchableOpacity style={styles.actionButton} onPress={handleWebsite}>
              <Ionicons name="globe-outline" size={24} color={colors.white} />
              <Text style={styles.actionButtonText}>Website</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 14,
    color: colors.textLight,
  },
  infoRow: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.textLight,
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});