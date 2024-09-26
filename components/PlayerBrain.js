import React, { useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";

export const tracks = [
  {
    index: 0,
    title: "Jhol",
    uri: require("@/assets/rhythm/jhol.mp3"),
    cover: require("@/assets/images/jhol.png"),
  },
  {
    index: 1,
    title: "Jo Tum Mere Ho",
    uri: require("@/assets/rhythm/jotummereho.mp3"),
    cover: require("@/assets/images/jotummereho.png"),
  },
  {
    index: 2,
    title: "Softly",
    uri: require("@/assets/rhythm/softly.mp3"),
    cover: require("@/assets/images/softly.png"),
  },
  {
    index: 3,
    title: "Open Letters",
    uri: require("@/assets/rhythm/openletters.mp3"),
    cover: require("@/assets/images/openletters.png"),
  },
  {
    index: 4,
    title: "ROCKSTAR WITHOUT A GUITAR",
    uri: require("@/assets/rhythm/rockstarwithoutaguitar.mp3"),
    cover: require("@/assets/images/rockstarwithoutaguitar.png"),
  },
  {
    index: 5,
    title: "Still Rollin",
    uri: require("@/assets/rhythm/stillrollin.mp3"),
    cover: require("@/assets/images/stillrollin.png"),
  },
  {
    index: 6,
    title: "smile",
    uri: require("@/assets/rhythm/smile.mp3"),
    cover: require("@/assets/images/smile.jpeg"),
  },
];

export const setPositionAsync = async (position) => {
  if (soundRef.current) {
    await soundRef.current.setPositionAsync(position);
  }
};


export default function PlayerBrain({ trackIndex, onPlaybackStatusUpdate }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    const loadTrack = async (index) => {
      try {
        if (soundRef.current) {
          await soundRef.current.unloadAsync();
        }
        const { sound: newSound } = await Audio.Sound.createAsync(
          tracks[index].uri
        );
        setSound(newSound);
        soundRef.current = newSound;
      } catch (error) {
        console.error("Error loading track:", error);
      }
    };

    loadTrack(trackIndex);

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [trackIndex]);

  const playSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.playAsync();
        setIsPlaying(true);
        if (onPlaybackStatusUpdate) onPlaybackStatusUpdate(true);
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const pauseSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
        if (onPlaybackStatusUpdate) onPlaybackStatusUpdate(false);
      }
    } catch (error) {
      console.error("Error pausing sound:", error);
    }
  };

  const nextTrack = async () => {
    const nextIndex = (trackIndex + 1) % tracks.length;
    await loadTrack(nextIndex);
  };

  const previousTrack = async () => {
    const prevIndex = (trackIndex - 1 + tracks.length) % tracks.length;
    await loadTrack(prevIndex);
  };

  
  return { playSound, pauseSound, nextTrack, previousTrack, isPlaying };
}
