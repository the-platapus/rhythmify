import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import  Ionicons from "@expo/vector-icons/Ionicons";

export default function NotificationBell() {
  const [isToggled, setIsToggled] = useState(false);

  const handlePress = () => {
    setIsToggled((prevState) => !prevState);
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      accessible
      accessibilityLabel={isToggled ? "Notifications On" : "Notifications Off"}
    >
      <Ionicons
        name={isToggled ? "notifications" : "notifications-outline"}
        size={25}
        color={"#8E8E8E"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignContent: "flex-end",
    marginLeft: "30%",
  },
});
