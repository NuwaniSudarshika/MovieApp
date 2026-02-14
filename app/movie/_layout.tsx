import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";

function LayoutContent() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  // THEME COLORS
  const bg = theme === "dark" ? "#0f172a" : "#f1f5f9";
  const footerBg = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const text = theme === "dark" ? "#fff" : "#000";

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }} />

      {/* FOOTER */}
      <View style={[styles.footer, { backgroundColor: footerBg }]}>
        
        <TouchableOpacity onPress={() => router.push("/movie")}>
          <View style={styles.footerItem}>
            <Ionicons name="home" size={22} color={text} />
            <Text style={[styles.footerText, { color: text }]}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/movie/favorites")}>
          <View style={styles.footerItem}>
            <Ionicons name="heart" size={22} color={text} />
            <Text style={[styles.footerText, { color: text }]}>Favorites</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/movie/profile")}>
          <View style={styles.footerItem}>
            <Ionicons name="person" size={22} color={text} />
            <Text style={[styles.footerText, { color: text }]}>Profile</Text>
          </View>
        </TouchableOpacity>

        {/* 🌙 LIGHT / DARK TOGGLE */}
        <TouchableOpacity onPress={toggleTheme}>
          <View style={styles.footerItem}>
            <Ionicons name={theme === "dark" ? "sunny" : "moon"} size={22} color={text} />
            <Text style={[styles.footerText, { color: text }]}>
              {theme === "dark" ? "Light" : "Dark"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={[styles.createdText, { color: text }]}>Made by: Nuwani</Text>
    </View>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    flexDirection: "row", justifyContent: "space-around",
    alignItems: "center", paddingVertical: 10, borderTopWidth: 1,
  },
  footerItem: { alignItems: "center" },
  footerText: { fontSize: 12, marginTop: 3, marginBottom: 20 },
  createdText: { textAlign: "center", fontSize: 12, marginTop: 53 },
});
