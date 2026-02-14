import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { movies } from "../../assets/data/movies";
import { useTheme } from "./theme/ThemeContext";

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();
  const [search, setSearch] = useState("");

  const bg = theme === "dark" ? "#0f172a" : "#f8fafc";
  const text = theme === "dark" ? "#fff" : "#000";
  const cardBg = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const placeholderColor = theme === "dark" ? "#94a3b8" : "#64748b";

  const filteredMovies = movies.filter(
    (movie) =>
      movie.name.toLowerCase().includes(search.toLowerCase()) ||
      movie.genre.toLowerCase().includes(search.toLowerCase())
  );

  const renderMovie = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardBg }]}
      onPress={() => router.push(`/movie/movieid/${item.id}`)}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={[styles.movieName, { color: text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.header, { color: text }]}>🎬 Movie Suggestions</Text>

      <View style={[styles.searchContainer, { backgroundColor: cardBg }]}>
        <TextInput
          placeholder="Search by name or genre..."
          placeholderTextColor={placeholderColor}
          style={[styles.searchInput, { color: text }]}
          value={search}
          onChangeText={setSearch}
        />

        <TouchableOpacity style={[styles.cbutton, { backgroundColor: cardBg }]} onPress={() => setSearch("")}>
          <Text style={[styles.cbuttonText, { color: text }]}>X</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMovies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={[styles.noResults, { color: placeholderColor }]}>No movies found</Text>}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, paddingTop: 50 },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 10, textAlign: "center" },
  searchContainer: {
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: { flex: 1, fontSize: 16, paddingVertical: 10 },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
  },
  image: { width: (screenWidth / 2) - 24, height: 220 },
  movieName: { fontSize: 16, fontWeight: "600", textAlign: "center", padding: 10 },
  noResults: { textAlign: "center", fontSize: 16, marginTop: 40 },
  cbutton: { borderRadius: 10, padding: 6 },
  cbuttonText: { fontSize: 16 },
});
