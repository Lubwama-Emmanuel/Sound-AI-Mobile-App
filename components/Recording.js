import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/Global";
import IconButton from "../ui/IconButton";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { playSound } from "../utils/sound";

export default function Recording({ recording }) {
  const { name, recordingUri } = recording;
  const [sound, setSound] = useState();

  async function handlePlaySound() {
    const newSound = await playSound(recordingUri);

    setSound(newSound);
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.iconContainer}>
        <IconButton
          name={"play"}
          size={35}
          color={colors.primary500}
          style={styles.icon}
          onPress={handlePlaySound}
        />
        <IconButton
          name={"share-outline"}
          size={35}
          color={colors.primary500}
          style={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.primary500,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 20,
    // borderRadius: 8,
    borderBottomColor: colors.primary300,
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 20,
    color: colors.primary800,
    fontWeight: "600",
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 5,
  },
});
