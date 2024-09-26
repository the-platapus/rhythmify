import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function NavigateToHome() {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity>
      <Link href="/" paddingLeft={"4%"}>
        <Ionicons
          name="chevron-back-outline"
          color={Colors[colorScheme].tabIconDefault}
          size={28}
        />
      </Link>
    </TouchableOpacity>
  );
}
