import { Audio } from "expo-av";

export async function playSound(soundUri) {
  console.log("Loading Sound");
  const { sound } = await Audio.Sound.createAsync((source = { uri: soundUri }));

  console.log("Playing Sound");
  await sound.playAsync();

  return sound;
}
