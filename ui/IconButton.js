import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton({ name, color, size, style, onPress }) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Ionicons name={name} color={color} size={size} style={style} />
      </Pressable>
    </View>
  );
}
