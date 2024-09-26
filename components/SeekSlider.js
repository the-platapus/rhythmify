import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export const SeekSlider = ({ currentPosition, duration, onSeek }) => {
  const colorScheme = useColorScheme();
  const value = duration ? currentPosition / duration : 0;

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.time, { color: Colors[colorScheme].text }]}>
        {Math.floor(currentPosition / 1000)}s / {Math.floor(duration / 1000)}s
      </ThemedText>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={value}
        onValueChange={(sliderValue) => {
          const newPosition = sliderValue * duration; // Calculate the new position
          onSeek(newPosition); // Pass the actual position in milliseconds
        }}
        minimumTrackTintColor={Colors[colorScheme].tint}
        maximumTrackTintColor={Colors[colorScheme].tabIconDefault}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 26,
    alignItems: "center",
  },
  time: {
    fontSize: 16,
  },
  slider: {
    width: "97%",
    // height: 40,
    // gap: 8
    marginVertical: 16,
  },
});

export default SeekSlider;
