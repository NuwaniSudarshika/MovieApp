import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./theme/ThemeContext";

export default function Favorites() {
  const router = useRouter();
  const { theme } = useTheme();

  const bg = theme === "dark" ? "#0f172a" : "#f1f5f9";
  const titleColor = theme === "dark" ? "#fff" : "#0f172a";
  const subtitleColor = theme === "dark" ? "#94a3b8" : "#475569";
  const buttonBg = theme === "dark" ? "#1e293b" : "#cbd5e1";
  const buttonText = theme === "dark" ? "#fff" : "#000";

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Ionicons name="heart" size={80} color="#ef4444" style={{ marginBottom: 20 }} />

      <Text style={[styles.title, { color: titleColor }]}>Your Favorites</Text>
      <Text style={[styles.subtitle, { color: subtitleColor }]}>
        Movies you love will appear here
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonBg }]}
        onPress={() => router.push("/movie")}
      >
        <Text style={[styles.buttonText, { color: buttonText }]}>
          Go Back Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 30 },
  button: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  buttonText: { fontSize: 16 },
});
