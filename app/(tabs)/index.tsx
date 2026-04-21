import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { usePlaces } from '@/hooks/usePlaces';
import { PlaceCard } from '@/components/PlaceCard';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorMessage } from '@/components/ErrorMessage';
import { CategoryFilter } from '@/components/CategoryFilter';
import { colors } from '@/constants/colors';

export default function DiscoverScreen() {
  const { 
    places, 
    loading, 
    error, 
    refetch, 
    setCategory, 
    currentCategory 
  } = usePlaces();

  if (loading && places.length === 0) {
    return <LoadingIndicator />;
  }

  if (error && places.length === 0) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      {/* Discover screen ka apna Category wrapper */}
      <View style={styles.categoryWrapper}>
        <CategoryFilter 
          selectedCategory={currentCategory} 
          onSelectCategory={setCategory} 
        />
      </View>

      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceCard place={item} />}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 16,
  },
});