import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/Global";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { addRecording } from "../utils/firebase";
import { insertRecording } from "../utils/database";

export default function Home() {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [soundUri, setSoundUri] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      (source = { uri: soundUri })
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function startRecording() {
    try {
      console.log(`Requesting permissions`);
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log(`Starting to record`);
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("recording", recording);
      console.log("Recording started");
    } catch (error) {
      console.log(`Failed to start recording..`, error);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setSoundUri(uri);
    console.log("Recording stopped and stored at", uri);
  }

  const obj = {
    name: "Recording" + "-" + Math.floor(Math.random() * 1000),
    recordingUri: soundUri,
  };

  async function savedToDB() {
    // addRecording(obj);
    insertRecording(obj);
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Pressable
          onPress={recording ? stopRecording : startRecording}
          style={({ pressed }) => pressed && { opacity: 0.7 }}
        >
          <View style={styles.actionContainer}>
            <Ionicons
              name={recording ? "stop" : "play"}
              color={colors.primary800}
              size={40}
            />
            <Text style={styles.text}>{recording ? "Stop" : "Start"}</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <Button onPress={playSound}>Play</Button>
        <Button onPress={savedToDB}>Save</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    borderColor: colors.primary800,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 100,
    height: 200,
    width: 200,
  },
  text: {
    fontSize: 25,
    textTransform: "uppercase",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
});
