import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Place } from '@/types/place';
import { RatingStars } from './RatingStars';
import { colors } from '@/constants/colors';
import { useFavorites } from '@/hooks/useFavorites';

interface PlaceCardProps {
  place: Place;
  compact?: boolean;
  showDistance?: boolean;
  distance?: number;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ 
  place, 
  compact = false,
  showDistance = false,
  distance
}) => {
  const router = useRouter();
  const { checkIsFavorite, toggleFavorite } = useFavorites();
  const isFavorite = checkIsFavorite(place.id);

  const handlePress = () => {
    router.push(`/details/${place.id}`);
  };

  const handleFavoritePress = async (e: any) => {
    e.stopPropagation();
    await toggleFavorite(place.id);
  };

  return (
    <TouchableOpacity 
      style={[styles.card, compact && styles.compactCard]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: place.imageUrl }} 
        style={[styles.image, compact && styles.compactImage]}
      />
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={handleFavoritePress}
      >
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorite ? colors.error : colors.white} 
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {place.name}
          </Text>
          {showDistance && distance !== undefined && (
            <Text style={styles.distance}>{distance.toFixed(1)} km</Text>
          )}
        </View>
        <View style={styles.ratingContainer}>
          <RatingStars rating={place.rating} size={14} />
          <Text style={styles.ratingText}>({place.totalRatings})</Text>
        </View>
        <Text style={styles.description} numberOfLines={compact ? 2 : 3}>
          {place.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.categoryBadge}>
            <Ionicons 
              name="location-outline" 
              size={12} 
              color={colors.primary} 
            />
            <Text style={styles.category} numberOfLines={1}>
              {place.category}
            </Text>
          </View>
          {place.priceLevel && (
            <View style={styles.priceContainer}>
              {[...Array(place.priceLevel)].map((_, i) => (
                <Ionicons key={i} name="cash-outline" size={12} color={colors.secondary} />
              ))}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compactCard: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  image: {
    width: '100%',
    height: 200,
  },
  compactImage: {
    height: 150,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  distance: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  ratingText: {
    fontSize: 12,
    color: colors.textLight,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  category: {
    fontSize: 12,
    color: colors.primary,
    textTransform: 'capitalize',
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 2,
  },
});