import React from "react";
import { View, FlatList, StyleSheet, RefreshControl, Text } from "react-native";
import { usePlaces } from "@/hooks/usePlaces";
import { useFavorites } from "@/hooks/useFavorites";
import { PlaceCard } from "@/components/PlaceCard";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

export default function FavoritesScreen() {
  const { places, loading, refetch } = usePlaces();
  const { favorites, loading: favoritesLoading } = useFavorites();

  const favoritePlaces = places.filter((place) => favorites.includes(place.id));

  if (loading || favoritesLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      {favoritePlaces.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color={colors.textLighter} />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>
            Tap the heart icon on any place to add it to favorites
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritePlaces}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaceCard place={item} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    marginTop: 8,
  },
});
