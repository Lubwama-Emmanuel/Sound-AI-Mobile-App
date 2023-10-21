import axios from "axios";
import { Recording } from "../models/recording";

// const axios = require("axios");

const BASE_URL = `https://untangled-772af-default-rtdb.firebaseio.com/recordings.json`;

export function addRecording(recordingData) {
  axios.post(BASE_URL, recordingData);
}
// class Recording {
//   constructor(id, name, recordingUri) {
//     this.id = id;
//     this.name = name;
//     this.recordingUri = recordingUri;
//   }
// }

export async function fetchRecordings() {
  console.log("here");
  try {
    const response = await axios.get(BASE_URL);

    const savedRecordings = [];

    for (const key in response.data) {
      const recordingObj = {
        id: key,
        name: response.data[key].name,
        recordingUri: response.data[key].recordingUri,
      };
      savedRecordings.push(recordingObj);
    }

    return savedRecordings;
  } catch (error) {
    console.log("an error occurred", error);
    return error;
  }
}

console.log(fetchRecordings());
