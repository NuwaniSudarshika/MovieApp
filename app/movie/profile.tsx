import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebaseconfig";
import { useTheme } from "./theme/ThemeContext";

export default function Profile() {
  const router = useRouter();
  const { theme } = useTheme();

  const bg = theme === "dark" ? "#0f172a" : "#f1f5f9";
  const text = theme === "dark" ? "#fff" : "#000";
  const subtitle = theme === "dark" ? "#94a3b8" : "#475569";
  const buttonBg = theme === "dark" ? "#ef4444" : "#ef4444";

  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@example.com");

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setEmail(currentUser.email || "user@example.com");

        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) setName(userDoc.data().name || "User");
      } else {
        router.replace("/login/Login");
      }
    };
    fetchUserData();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Ionicons name="person-circle" size={120} color="#38bdf8" style={{ marginBottom: 20 }} />

      <Text style={[styles.name, { color: text }]}>{name}</Text>
      <Text style={[styles.email, { color: subtitle }]}>{email}</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: buttonBg }]} onPress={async () => {
        await auth.signOut();
        router.replace("/login/Login");
      }}>
        <Text style={[styles.buttonText, { color: "#fff" }]}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 30 },
  name: { fontSize: 22, fontWeight: "700", marginBottom: 5 },
  email: { fontSize: 16, marginBottom: 40 },
  button: { paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10 },
  buttonText: { fontSize: 16 },
});
