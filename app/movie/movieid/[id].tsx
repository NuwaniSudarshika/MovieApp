import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { movies } from "../../../assets/data/movies";
import StarRating from "../../../components/StarRating";
import { auth, db } from "../../../firebaseconfig";
import { useTheme } from ".././theme/ThemeContext";

const { height } = Dimensions.get("window");

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const [rating, setRating] = useState(0);

  const movie = movies.find((m) => m.id.toString() === id);

  // Load existing rating for this user
  useEffect(() => {
    const fetchRating = async () => {
      if (!auth.currentUser) return;
      const ratingDoc = await getDoc(doc(db, "ratings", `${auth.currentUser.uid}_${id}`));
      if (ratingDoc.exists()) {
        setRating(ratingDoc.data().rating);
      }
    };
    fetchRating();
  }, [id]);

  const handleRatingChange = async (value: number) => {
    setRating(value);

    if (!auth.currentUser) {
      Alert.alert("Login required", "You must be logged in to rate a movie.");
      return;
    }

    try {
      await setDoc(doc(db, "ratings", `${auth.currentUser.uid}_${id}`), {
        movieId: id,
        userId: auth.currentUser.uid,
        rating: value,
        timestamp: new Date(),
      });
      Alert.alert("Success", "Your rating has been saved!");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save rating.");
    }
  };

  if (!movie) {
    return (
      <View style={[styles.notFound, { backgroundColor: theme === "dark" ? "#0f172a" : "#f1f5f9" }]}>
        <Text style={{ color: theme === "dark" ? "#fff" : "#000", fontSize: 18 }}>Movie not found.</Text>
      </View>
    );
  }

  const bg = theme === "dark" ? "#0f172a" : "#f1f5f9";
  const text = theme === "dark" ? "#fff" : "#000";
  const subtitle = theme === "dark" ? "#cbd5e1" : "#475569";
  const infoBg = theme === "dark" ? "#1e293b" : "#e2e8f0";

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]} contentContainerStyle={{ paddingBottom: 120 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={{ color: text, fontSize: 18 }}>← Back</Text>
      </TouchableOpacity>

      <Image source={movie.image} style={styles.image} />

      <View style={styles.content}>
        <Text style={[styles.title, { color: text }]}>{movie.name}</Text>
        <Text style={[styles.description, { color: subtitle }]}>{movie.description}</Text>

        <View style={[styles.infoBox, { backgroundColor: infoBg }]}>
          <Text style={[styles.label, { color: subtitle }]}>Cast:</Text>
          <Text style={[styles.value, { color: text }]}>{movie.cast}</Text>

          <Text style={[styles.label, { color: subtitle }]}>Genre:</Text>
          <Text style={[styles.value, { color: text }]}>{movie.genre}</Text>

          <Text style={[styles.label, { color: subtitle }]}>Release Date:</Text>
          <Text style={[styles.value, { color: text }]}>{movie.releaseDate}</Text>
        </View>

        {/* Star Rating */}
        <View style={[styles.ratingContainer, { backgroundColor: infoBg }]}>
          <Text style={[styles.label, { color: text, marginBottom: 10 }]}>Rate this movie:</Text>
          <StarRating rating={rating} onChange={handleRatingChange} />
          <Text style={[styles.value, { color: text, marginTop: 10 }]}>Your Rating: {rating} / 5</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 2 },
  image: { width: "100%", height: height * 0.5 },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 20, lineHeight: 22 },
  infoBox: { borderRadius: 12, padding: 15 },
  label: { fontSize: 14, marginTop: 10 },
  value: { fontSize: 16, fontWeight: "500" },
  ratingContainer: { borderRadius: 12, padding: 15, marginTop: 20, alignItems: "center" },
  notFound: { flex: 1, justifyContent: "center", alignItems: "center" },
});
