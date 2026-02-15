import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// ✅ Default export
export default function StarRating({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (value: number) => void;
}) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onChange(star)}>
          <Text
            style={{
              fontSize: 30,
              marginRight: 5,
              color: star <= rating ? "#FFD700" : "#888",
            }}
          >
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
