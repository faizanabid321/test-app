import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SortOption } from '@/types/place';
import { colors } from '@/constants/colors';

interface SortOptionsProps {
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  showDistance?: boolean;
}

export const SortOptions: React.FC<SortOptionsProps> = ({
  selectedSort,
  onSelectSort,
  showDistance = false,
}) => {
  const sortOptions: { value: SortOption; label: string; icon: string }[] = [
    { value: 'rating', label: 'Top Rated', icon: 'star' },
    { value: 'price', label: 'Price', icon: 'cash-outline' },
  ];

  if (showDistance) {
    sortOptions.push({ value: 'distance', label: 'Nearest', icon: 'location-outline' });
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {sortOptions.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.sortButton,
            selectedSort === option.value && styles.selectedButton,
          ]}
          onPress={() => onSelectSort(option.value)}
        >
          <Ionicons
            name={option.icon as any}
            size={16}
            color={selectedSort === option.value ? colors.white : colors.primary}
          />
          <Text
            style={[
              styles.sortText,
              selectedSort === option.value && styles.selectedText,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  sortText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  selectedText: {
    color: colors.white,
  },
});