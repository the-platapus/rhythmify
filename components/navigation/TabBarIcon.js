import Ionicons from '@expo/vector-icons/Ionicons';

// Functional component for TabBarIcon
export function TabBarIcon({ style, ...rest }) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
