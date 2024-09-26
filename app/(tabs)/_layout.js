import React from "react";
import { Tabs } from "expo-router";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";
import NavigateToHome from "@/components/NavigateToHome";
import NowPlaying from "@/components/NowPlaying";
import { ThemedText } from "@/components/ThemedText";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme || "light"].tint,
        tabBarShowLabel: false,
        headerStatusBarHeight: 42,
        headerStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
        tabBarStyle: {
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          // padding: 20,
          marginHorizontal: '2%',
          height: 100,
          position: "absolute",
          overflow: "hidden",
          // backgroundColor: Colors[colorScheme].background,

        },
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={56}
            style={StyleSheet.absoluteFill}
            // experimentalBlurMethod="dimezisBlurView"
            shadowColor={Colors[colorScheme].tint}
            shadowOpacity={0.3}
            elevation={5}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="player"
        options={{
          headerStatusBarHeight: 62,
          headerTitle: () => <ThemedText > Now Playing </ThemedText>,
          headerLeft: () => <NavigateToHome />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "musical-notes" : "musical-notes-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          headerTitle: () => <ThemedText></ThemedText>,
          headerLeft: () => <NavigateToHome />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "heart" : "heart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="concerts"
        options={{
          headerTitle: () => <ThemedText>Live Events</ThemedText>,
          headerLeft: () => <NavigateToHome />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "location" : "location-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
