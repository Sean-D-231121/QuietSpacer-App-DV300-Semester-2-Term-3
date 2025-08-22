import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import { auth } from "../firebase";
import {
  getUserProfile,
  getAllPlacesFromFirestore,
} from "../services/DbService";

const moodOptions = [
  { key: "Happy", label: "😁 Happy" },
  { key: "Calm", label: "😊 Calm" },
  { key: "Excited", label: "😃 Excited" },
  { key: "Sad", label: "🥲 Sad" },
  { key: "Stressed", label: "😣 Stressed" },
];

type MoodCount = {
  [key: string]: number;
};

const MoodDashboard = () => {
  const [moodCounts, setMoodCounts] = useState<MoodCount>({});
  const [happiestPlace, setHappiestPlace] = useState<string>("");
  const [moodPlaceCorrelation, setMoodPlaceCorrelation] = useState<any[]>([]);
  const [moodStreak, setMoodStreak] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const profile = await getUserProfile(userId);
      const placesResp = await getAllPlacesFromFirestore();
      const places =
        placesResp.success && placesResp.places ? placesResp.places : [];

      if (profile && profile.moods.length > 0) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const recentMoods = profile.moods.filter(
          (m) => new Date(m.date) >= oneWeekAgo
        );

        const counts: MoodCount = {};
        moodOptions.forEach((m) => (counts[m.key] = 0));
        recentMoods.forEach((m) => {
          if (counts[m.type] !== undefined) {
            counts[m.type] += 1;
          }
        });
        setMoodCounts(counts);

        const happyMoods = recentMoods.filter((m) => m.type === "Happy");
        if (happyMoods.length > 0) {
          const placeCount: { [placeId: string]: number } = {};
          happyMoods.forEach((m) => {
            placeCount[m.placeId] = (placeCount[m.placeId] || 0) + 1;
          });

          const topPlaceId = Object.keys(placeCount).reduce((a, b) =>
            placeCount[a] > placeCount[b] ? a : b
          );

          const place = places.find((p: any) => p.id === topPlaceId);
          setHappiestPlace(place ? place.name : "Unknown Place");
        } else {
          setHappiestPlace("No Happy places logged this week");
        }

        const moodPlaceMap: { [key: string]: { [place: string]: number } } = {};
        recentMoods.forEach((m) => {
          const place = places.find((p: any) => p.id === m.placeId);
          const placeName = place ? place.name : "Unknown Place";

          if (!moodPlaceMap[m.type]) moodPlaceMap[m.type] = {};
          moodPlaceMap[m.type][placeName] =
            (moodPlaceMap[m.type][placeName] || 0) + 1;
        });

        const moodPlaceArray: any[] = [];
        Object.keys(moodPlaceMap).forEach((mood) => {
          const topPlace = Object.keys(moodPlaceMap[mood]).reduce((a, b) =>
            moodPlaceMap[mood][a] > moodPlaceMap[mood][b] ? a : b
          );
          moodPlaceArray.push({
            mood,
            place: topPlace,
            count: moodPlaceMap[mood][topPlace],
          });
        });
        setMoodPlaceCorrelation(moodPlaceArray);

        const sortedMoods = [...profile.moods].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        if (sortedMoods.length > 0) {
          const latestMood = sortedMoods[0].type;
          let streak = 1;

          for (let i = 1; i < sortedMoods.length; i++) {
            if (sortedMoods[i].type === latestMood) {
              streak++;
            } else {
              break;
            }
          }
          setMoodStreak(`${streak}-day ${latestMood} streak 🎉`);
        }
      }
    };

    fetchData();
  }, []);

  const totalMoods = Object.values(moodCounts).reduce((a, b) => a + b, 0);

  return (
    <ScrollView style={styles.container}>
      {/* Streak + Happiest Place */}
      {(moodStreak || happiestPlace) && (
        <View style={styles.card}>
          {moodStreak ? (
            <Text style={styles.streakText}>{moodStreak}</Text>
          ) : null}
          <Text style={[styles.happiestText, { marginTop: 10 }]}>
            Happiest Place this week:{"\n"}
            <Text style={styles.happiestPlace}>{happiestPlace}</Text>
          </Text>
        </View>
      )}

      {/* Mood Dashboard */}
      <View style={styles.card}>
        <Text style={styles.header}>Your Mood Dashboard</Text>
        {moodOptions.map((mood) => {
          const value = moodCounts[mood.key] || 0;
          const progress = totalMoods > 0 ? value / totalMoods : 0;
          return (
            <View key={mood.key} style={styles.moodRow}>
              <Text style={styles.moodText}>
                {mood.label}: {value}
              </Text>
              <Progress.Bar
                progress={progress}
                width={250}
                height={14}
                borderRadius={20}
                color="#2e4057"
                unfilledColor="#f1f1f1"
                borderWidth={0}
                style={{ marginTop: 5 }}
              />
            </View>
          );
        })}
      </View>

      {/* Mood–Place Correlation */}
      <View style={styles.card}>
        <Text style={styles.header}>Mood–Place Correlation</Text>
        {moodPlaceCorrelation.map((item, idx) => (
          <Text key={idx} style={styles.correlationText}>
            {item.mood} → {item.place} ({item.count} times)
          </Text>
        ))}
      </View>
    </ScrollView>
  );

};

export default MoodDashboard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
    padding: 18,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: "#a6dce5", // pastel blue like inputs
    alignItems: "center",
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAF5E6", // soft cream like your signup bg
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
    textAlign: "center",
    color: "#4a4a4a",
  },
  moodRow: {
    marginBottom: 20,
    alignItems: "center",
  },
  moodText: {
    fontSize: 15,
    marginBottom: 5,
    color: "#333",
  },
  happiestText: {
    fontSize: 15,
    textAlign: "center",
    color: "#333",
  },
  happiestPlace: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2e4057",
  },
  streakText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#2e4057",
  },
  correlationText: {
    fontSize: 15,
    color: "#333",
  },
});
