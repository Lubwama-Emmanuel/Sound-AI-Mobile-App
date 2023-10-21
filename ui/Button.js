import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/Global";

export default function Button({ children, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && { opacity: 0.7 }}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 20,
    borderWidth: 2,
    borderColor: colors.primary800,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
