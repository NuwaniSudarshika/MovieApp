import { router } from "expo-router";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SplashScreen() {
  const [step, setStep] = useState(0);

  const screens = [
    {
      animation: require("../assets/images/Welcome Animation.json"),
      title: "Welcome to MovieApp",
      subtitle: "Discover and track your favorite movies",
    },
    {
      animation: require("../assets/images/Location Lottie Animation.json"),
      title: "Explore Movies",
      subtitle: "Search movies by genre, cast, and more",
    },
    {
      animation: require("../assets/images/Pay Now.json"),
      title: "Favorites",
      subtitle: "Save your favorite movies in one place",
    },
  ];

  const gotoLogin = () => router.replace("/login/Login");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < screens.length - 1) setStep(step + 1);
      else gotoLogin();
    }, 3000);
    return () => clearTimeout(timer);
  }, [step]);

  const next = () => (step < screens.length - 1 ? setStep(step + 1) : gotoLogin());
  const prev = () => step > 0 && setStep(step - 1);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={gotoLogin}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Lottie
        animationData={screens[step].animation}
        loop
        autoplay
        style={styles.animation}
      />
      <Text style={styles.title}>{screens[step].title}</Text>
      <Text style={styles.subtitle}>{screens[step].subtitle}</Text>

      <View style={styles.btnRow}>
        {step > 0 ? (
          <TouchableOpacity style={styles.navBtn} onPress={prev}>
            <Text style={styles.navTxt}>Previous</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 90 }} />
        )}
        <TouchableOpacity style={styles.navBtn} onPress={next}>
          <Text style={styles.navTxt}>{step === screens.length - 1 ? "Get Started" : "Next"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FF", alignItems: "center", justifyContent: "center", paddingHorizontal: 25 },
  skipBtn: { position: "absolute", top: 50, right: 20, backgroundColor: "rgba(0,0,0,0.05)", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  skipText: { fontSize: 15, color: "#555", fontWeight: "600" },
  animation: { width: 340, height: 340 },
  title: { fontSize: 28, fontWeight: "800", marginTop: 20, color: "#111", textAlign: "center" },
  subtitle: { fontSize: 16, color: "#6a6a6a", textAlign: "center", marginTop: 10, lineHeight: 22 },
  btnRow: { flexDirection: "row", width: "90%", justifyContent: "space-between", marginTop: 40, alignItems: "center" },
  navBtn: { backgroundColor: "#111", width: 90, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center" },
  navTxt: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
