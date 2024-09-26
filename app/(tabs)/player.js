import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import PlayerBrain from "@/components/PlayerBrain";
import { Ionicons } from "@expo/vector-icons";
import { tracks } from "@/components/PlayerBrain";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import SeekSlider from "@/components/SeekSlider";

export default function Player() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const colorScheme = useColorScheme();

  const {
    playSound,
    pauseSound,
    nextTrack,
    previousTrack,
    isPlaying: isPlayingInPlayerBrain,
    getStatusAsync,
    setPositionAsync,
  } = PlayerBrain({
    trackIndex: currentTrackIndex,
    onPlaybackStatusUpdate: (status) => {
      setIsPlaying(status.isPlaying);
      setCurrentPosition(status.positionMillis || 0);
      setDuration(status.durationMillis || 0);
    },
  });

  useEffect(() => {
    const updatePosition = async () => {
      const status = await getStatusAsync();
      if (status) {
        setCurrentPosition(status.positionMillis || 0);
        setDuration(status.durationMillis || 0);
      }
    };

    const interval = setInterval(updatePosition, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSeek = async (value) => {
    const newPosition = value * duration; // Normalize the value to milliseconds
    console.log("Seeking to position:", newPosition); // Debugging log
    await setPositionAsync(newPosition); // Update playback position
    setCurrentPosition(newPosition); // Update local state for visual feedback
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={tracks[currentTrackIndex].cover}
        style={{
          marginVertical: "12%",
          alignSelf: "center",
          height: 326,
          width: 326,
          borderRadius: 20,
          backgroundColor: Colors[colorScheme].background,
          shadowColor: Colors[colorScheme].tint,
          shadowOpacity: 0.3,
          elevation: 5,
        }}
      />
      <ThemedText type="subtitle" style={styles.thefuckingtitle}>
        {tracks[currentTrackIndex].title}
      </ThemedText>
      <SeekSlider
        currentPosition={currentPosition}
        duration={duration}
        onSeek={handleSeek}
      />
      <ThemedView style={styles.controls}>
        <TouchableOpacity title="Previous" onPress={previousTrack}>
          <Ionicons
            name="play-skip-back-outline"
            color={Colors[colorScheme].tint}
            size={40}
            margin={10}
          />
        </TouchableOpacity>
        <ThemedView
          style={{
            backgroundColor: Colors[colorScheme].tint,
            height: 65,
            width: 65,
            borderRadius: 50,
          }}
        >
          {isPlayingInPlayerBrain ? (
            <TouchableOpacity
              title="Pause"
              onPress={pauseSound}
              activeOpacity={0.3}
            >
              <Ionicons
                name="pause-outline"
                color={Colors[colorScheme].background}
                size={41}
                alignSelf={"center"}
                marginVertical={12}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              title="Play"
              onPress={playSound}
              activeOpacity={0.6}
            >
              <Ionicons
                name="play"
                color={Colors[colorScheme].background}
                size={40}
                alignSelf={"center"}
                marginVertical={12}
                paddingLeft={4}
              />
            </TouchableOpacity>
          )}
        </ThemedView>
        <TouchableOpacity title="Next" onPress={nextTrack}>
          <Ionicons
            name="play-skip-forward-outline"
            color={Colors[colorScheme].tint}
            size={40}
            margin={10}
          />
        </TouchableOpacity>
      </ThemedView>
      {/* <FlatList
        data={tracks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setCurrentTrackIndex(item.index)}>
            <ThemedText style={styles.track}>{item.title}</ThemedText>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.index.toString()}
      /> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  track: {
    fontSize: 18,
  },
  thefuckingtitle: {
    alignSelf: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
