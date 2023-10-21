import * as SQLite from "expo-sqlite";
import { Recording } from "../models/recording";

const database = SQLite.openDatabase("recordings.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS recordings (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        recordingUri TEXT NOT NULL
      )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertRecording(recording) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO recordings (name, recordingUri) VALUES (?, ?)`,
        [recording.name, recording.recordingUri],
        (_, result) => {
          console.log("here is the inserted value", result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchRecordings() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM recordings`,
        [],
        (_, result) => {
          const savedRecordings = [];
          for (const dp of result.rows._array) {
            savedRecordings.push(
              new Recording(dp.id, dp.name, dp.recordingUri)
            );
          }
          resolve(savedRecordings);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
