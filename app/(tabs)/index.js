import {
  Image,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { HelloWave } from "@/components/HelloWave";
import NotificationBell from "@/components/NotificationBell";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FlashList } from "@shopify/flash-list";
import PlayerBrain from "@/components/PlayerBrain";
import { tracks } from "@/components/PlayerBrain";
import { Link } from "expo-router";

const RECENTLYPLAYED = [
  {
    index: 0,
    cover: require("@/assets/images/jhol.png"),
    title: "Jhol",
  },
  {
    index: 1,
    cover: require("@/assets/images/jotummereho.png"),
    title: "Jo Tum Mere Ho",
  },
  {
    index: 2,
    cover: require("@/assets/images/softly.png"),
    title: "Softly",
  },
];

const RECOMMENDATIONS = [
  {
    index: 3,
    cover: require("@/assets/images/openletters.png"),
    title: "Open Letters",
    artist: "Talha Anjum, Umair",
    streams: "114k / streams",
  },
  {
    index: 4,
    cover: require("@/assets/images/rockstarwithoutaguitar.png"),
    title: "ROCKSTAR WITHOUT A GUITAR",
    artist: "Patani kisne banaya",
    streams: "60.5k / streams",
  },
  {
    index: 5,
    cover: require("@/assets/images/stillrollin.png"),
    title: "Still Rollin",
    artist: "SHUBH NALLA",
    streams: "44.3k / streams",
  },
  {
    index: 6,
    cover: require("@/assets/images/smile.jpeg"),
    title: "smile",
    artist: "sad loife uwayyyy",
    streams: "69.3k / streams",
  },
  {
    index: 7,
    cover: require("@/assets/images/blank.png"),
    title: "",
    artist: "",
    streams: "",
  },
];

const RecentlyPlayed = () => {
  const handlePress = (index) => {
    setCurrentTrackIndex(index);
    <Link href="/(tabs)/player" />;
  };

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    playSound,
    pauseSound,
    nextTrack,
    previousTrack,
    isPlaying: isPlayingInPlayerBrain,
  } = PlayerBrain({
    trackIndex: currentTrackIndex,
    onPlaybackStatusUpdate: (status) => setIsPlaying(status),
  });

  return (
    <FlashList
      data={RECENTLYPLAYED}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item.index)}
          activeOpacity={0.6}
          style={styles.recentlyPlayedStep}
        >
          <Image source={item.cover} style={styles.recentlyPlayedCovers} />
          <ThemedText
            type="default"
            style={{ textAlign: "center", fontSize: 12 }}
          >
            {item.title}
          </ThemedText>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.index.toString()}
      estimatedItemSize={500}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
    />
  );
};

const Recommendations = () => {
  const handlePress = (index) => {
    setCurrentTrackIndex(index);
    <Link href="/(tabs)/player" />;
  };

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    playSound,
    pauseSound,
    nextTrack,
    previousTrack,
    isPlaying: isPlayingInPlayerBrain,
  } = PlayerBrain({
    trackIndex: currentTrackIndex,
    onPlaybackStatusUpdate: (status) => setIsPlaying(status),
  });

  return (
    <FlashList
      keyboardDismissMode="on-drag"
      // showsVerticalScrollIndicator="false"
      data={RECOMMENDATIONS}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item.index)}
          activeOpacity={0.6}
          style={styles.recommendationContainer}
        >
          <Image source={item.cover} style={styles.recentlyPlayedCovers} />
          <ThemedView style={{ flexDirection: "coloumn" }}>
            <ThemedText type="default">{item.title}</ThemedText>
            <ThemedText type="default" style={{ fontSize: 12 }}>
              {item.artist}
              {"\n"}
              {item.streams}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.index.toString()}
      estimatedItemSize={500}
    />
  );
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView
      style={styles.content}
      // headerBackgroundColor={{ light: "#A1CEDC", dark: "#0A091E" }}
    >
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.6}>
          <Image
            source={require("@/assets/images/user.jpg")}
            style={styles.userIcon}
          />
        </TouchableOpacity>
        <ThemedView>
          <ThemedText type="subtitle">Fuck you!</ThemedText>
          <ThemedText type="default">Gold Member</ThemedText>
        </ThemedView>
        <HelloWave />
        <NotificationBell />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ width: "60%" }}>
          Listen The Latest Tunes
        </ThemedText>
        <TextInput
          style={{
            width: "40%",
            height: "90%",
            margin: 2.5,
            padding: "5%",
            borderRadius: 20,
            backgroundColor: Colors[colorScheme].background,
            shadowColor: Colors[colorScheme].tint,
            color: Colors[colorScheme].text,
            shadowOpacity: 0.3,
            elevation: 5,
            textAlign: "center",
          }}
          placeholderTextColor={Colors[colorScheme].tabIconDefault}
          enablesReturnKeyAutomatically={true}
          // multiline={true}
          returnKeyType="search"
          placeholder="Search"
        ></TextInput>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Recently Played</ThemedText>
        <RecentlyPlayed />
      </ThemedView>
      <ThemedText type="subtitle">Recommended for you</ThemedText>
      <Recommendations />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 10,
    padding: 24,
    gap: 16,
    overflow: "visible",
  },
  headerContainer: {
    paddingTop: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userIcon: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginRight: 2,
  },
  bellIcon: {
    alignContent: "flex-end",
    marginLeft: "42%",
  },
  titleContainer: {
    gap: 8,
    marginVertical: 8,
    flexDirection: "row",
  },
  stepContainer: {
    gap: 12,
  },
  recentlyPlayedStep: {
    paddingRight: 14,
  },
  recentlyPlayedCovers: {
    height: 112,
    width: 112,
    borderRadius: 20,
  },
  recommendationContainer: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 14,
  },
});
