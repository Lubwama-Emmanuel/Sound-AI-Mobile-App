import { FlatList, View } from "react-native";
import Recording from "../components/Recording";
import { useEffect, useState } from "react";
import { fetchRecordings } from "../utils/database";
// import { fetchRecordings } from "../utils/firebase";

export default function Recordings() {
  const [recordings, setRecordings] = useState([]);

  const refactoredRecordings = recordings.reverse();

  useEffect(() => {
    async function getRecordings() {
      const res = await fetchRecordings();

      setRecordings(res);
    }

    getRecordings();
  }, []);

  function renderRecording({ item }) {
    return <Recording recording={item} />;
  }

  return (
    <View>
      <FlatList
        data={refactoredRecordings}
        keyExtractor={(item) => item.id}
        renderItem={renderRecording}
      />
    </View>
  );
}
