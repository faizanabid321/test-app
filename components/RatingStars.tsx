import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showEmpty?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 20, 
  showEmpty = true 
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = showEmpty ? 5 - Math.ceil(rating) : 0;

  return (
    <View style={styles.container}>
      {[...Array(fullStars)].map((_, i) => (
        <Ionicons 
          key={`full-${i}`} 
          name="star" 
          size={size} 
          color={colors.rating} 
        />
      ))}
      {hasHalfStar && (
        <Ionicons 
          key="half" 
          name="star-half" 
          size={size} 
          color={colors.rating} 
        />
      )}
      {showEmpty && [...Array(emptyStars)].map((_, i) => (
        <Ionicons 
          key={`empty-${i}`} 
          name="star-outline" 
          size={size} 
          color={colors.rating} 
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});