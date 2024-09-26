// import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image } from "react-native";

// import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function favourite() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      HEADER_HEIGHT={100}
    >
    
      <ThemedView style={styles.aboutContainer}>
        <Image
          source={require("@/assets/images/user.jpg")}
          style={styles.userImage}
        />
        <ThemedView>
          <ThemedText type="subtitle">Fuck You!</ThemedText>
          <ThemedText type="default">
            sastapaan@gmail.com{"\n"}{"\n"}Gold Member{"\n"}{"\n"}I like music lalalala la
          </ThemedText>
        </ThemedView>
      </ThemedView>
      </ParallaxScrollView>
      
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    
    flexDirection: "row",
    gap: 8,
  },
  aboutContainer: {
    flexDirection: "row",
    gap: 20,
  },
  userImage: {
    height: 112,
    width: 112,
    borderRadius: 20,
  },
});
