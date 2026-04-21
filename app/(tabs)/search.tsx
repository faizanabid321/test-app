import React, { useState, useMemo } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePlaces } from "@/hooks/usePlaces";
import { PlaceCard } from "@/components/PlaceCard";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ErrorMessage } from "@/components/ErrorMessage";
import { CategoryFilter } from "@/components/CategoryFilter";
import { colors } from "@/constants/colors";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { places, loading, error, refetch, setCategory, currentCategory } =
    usePlaces();

  const filteredPlaces = useMemo(() => {
    if (!searchQuery.trim()) {
      return places;
    }
    const query = searchQuery.toLowerCase();
    return places.filter(
      (place) =>
        place.name.toLowerCase().includes(query) ||
        place.description.toLowerCase().includes(query) ||
        place.category.toLowerCase().includes(query),
    );
  }, [places, searchQuery]);

  if (loading && places.length === 0) {
    return <LoadingIndicator />;
  }

  if (error && places.length === 0) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search places, restaurants, parks..."
            placeholderTextColor={colors.textLighter}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.textLight}
              onPress={() => setSearchQuery("")}
            />
          )}
        </View>
      </View>

      {/* Search screen ka apna Category wrapper */}
      <View style={styles.categoryWrapper}>
        <CategoryFilter
          selectedCategory={currentCategory}
          onSelectCategory={setCategory}
        />
      </View>

      {/* Results List */}
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceCard place={item} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={64}
              color={colors.textLighter}
            />
            <Text style={styles.emptyText}>No places found</Text>
            <Text style={styles.emptySubtext}>
              Try a different search term or category
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchWrapper: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    padding: 0,
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
  },
});
