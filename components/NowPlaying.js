import { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { tracks } from "@/components/PlayerBrain";
import { currentTrackIndex } from "@/components/PlayerBrain";
import PlayerBrain from "@/components/PlayerBrain";

export default function NowPlaying() {
//   const [currentTrackIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const {} = PlayerBrain({
//     trackIndex: currentTrackIndex,
//     onPlaybackStatusUpdate: (status) => setIsPlaying(status),
//   });

  return (
    <ThemedText type="subtitle" style={styles.thefuckingtitle}>
      {tracks[currentTrackIndex].title}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  thefuckingtitle: {
    // padding:8
  },
});
