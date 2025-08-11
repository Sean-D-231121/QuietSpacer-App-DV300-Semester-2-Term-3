import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Progress from "react-native-progress";

const initialProfileData = {
  username: "Elnacho52",
  bio: "I’m a curious and creative thinker who enjoys exploring new ideas and solving problems in unique ways. I have a passion for technology and design, and I love building things that make life easier for others.",
  profilePic: "https://placekitten.com/200/200",
  calmScore: 8.7,
  totalVisits: 100,
  moodLogs: 45,
  calmDaysThisWeek: 5,
  favoriteCategories: [
    { name: "Nature & Parks", percent: 0.6 },
    { name: "Cafes", percent: 0.2 },
    { name: "Museums", percent: 0.1 },
    { name: "Theatres", percent: 0.1 },
  ],
  favoritePlaces: [
    {
      name: "Botanical Gardens",
      visits: 50,
      image: "https://placekitten.com/300/200",
    },
    {
      name: "Lakeside Retreat",
      visits: 20,
      image: "https://placekitten.com/301/200",
    },
    {
      name: "Urban Green Spot",
      visits: 15,
      image: "https://placekitten.com/302/200",
    },
    {
      name: "Old Town Plaza",
      visits: 10,
      image: "https://placekitten.com/303/200",
    },
    {
      name: "Downtown Carnival",
      visits: 5,
      image: "https://placekitten.com/304/200",
    },
  ],
  moodHistory: [
    {
      mood: "😌 Calm",
      description: "Sat near the lake and just breathed deeply.",
      time: "Today",
    },
    {
      mood: "😃 Happy",
      description: "Loved the walk through botanical gardens.",
      time: "Yesterday",
    },
    {
      mood: "😔 Sad",
      description: "A bit overwhelmed, took a break in the park.",
      time: "2 days ago",
    },
  ],
};

const moodOptions = [
  "😌 Calm",
  "😃 Happy",
  "😔 Sad",
  "😡 Angry",
  "😴 Tired",
  "🤩 Excited",
];

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(initialProfileData);
  const [selectedMood, setSelectedMood] = useState("");
  const [moodDescription, setMoodDescription] = useState("");

  const addMoodLog = () => {
    if (!selectedMood) return;
    const newLog = {
      mood: selectedMood,
      description: moodDescription || "No description provided.",
      time: "Just now",
    };
    setProfileData((prev) => ({
      ...prev,
      moodHistory: [newLog, ...prev.moodHistory],
    }));
    setSelectedMood("");
    setMoodDescription("");
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: profileData.profilePic }}
        style={styles.profilePic}
      />
      <Text style={styles.label}>Username</Text>
      <Text style={styles.username}>{profileData.username}</Text>

      <Text style={styles.label}>What I like?</Text>
      <Text style={styles.bio}>{profileData.bio}</Text>

      <Text style={styles.label}>Calmness Stats</Text>
      <View style={styles.statsContainer}>
        <Text>Average Calm Score: 🌿 {profileData.calmScore} / 10</Text>
        <Text>Total Visits: 📍 {profileData.totalVisits}</Text>
        <Text>Mood Logs: 😊 {profileData.moodLogs}</Text>
        <Text style={{ marginTop: 10 }}>Calm Days This Week</Text>
        <Progress.Bar
          progress={profileData.calmDaysThisWeek / 7}
          width={null}
          color="#7BD3EA"
        />
      </View>

      <Text style={styles.label}>Categories That I Like</Text>
      {profileData.favoriteCategories.map((cat, index) => (
        <View key={index} style={styles.categoryRow}>
          <Text style={styles.categoryText}>{cat.name}</Text>
          <Progress.Bar progress={cat.percent} width={null} color="#A0E7E5" />
        </View>
      ))}

      <Text style={styles.label}>Favourite Places</Text>
      {profileData.favoritePlaces.map((place, index) => (
        <View key={index} style={styles.placeRow}>
          <Image source={{ uri: place.image }} style={styles.placeImage} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text>Visits: {place.visits}</Text>
            <Progress.Bar
              progress={place.visits / 50}
              width={null}
              color="#FFB5A7"
            />
          </View>
        </View>
      ))}

      {/* Mood Input Section */}
      <Text style={styles.label}>Add Current Mood</Text>
      <View style={styles.moodOptions}>
        {moodOptions.map((m, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.moodOption,
              selectedMood === m && { backgroundColor: "#FFD6A5" },
            ]}
            onPress={() => setSelectedMood(m)}
          >
            <Text style={styles.moodText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Describe your mood..."
        value={moodDescription}
        onChangeText={setMoodDescription}
      />
      <TouchableOpacity style={styles.saveBtn} onPress={addMoodLog}>
        <Text style={styles.saveBtnText}>Save Mood</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Recent Mood Logs</Text>
      {profileData.moodHistory.map((entry, index) => (
        <View key={index} style={styles.moodLog}>
          <Text style={styles.mood}>{entry.mood}</Text>
          <Text style={styles.moodDesc}>{entry.description}</Text>
          <Text style={styles.moodTime}>{entry.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7E9",
    padding: 20,
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 6,
    color: "#333",
  },
  username: {
    fontSize: 18,
    backgroundColor: "#BDE0FE",
    padding: 8,
    borderRadius: 15,
    textAlign: "center",
    marginBottom: 10,
  },
  bio: {
    backgroundColor: "#BDE0FE",
    padding: 10,
    borderRadius: 15,
    textAlign: "center",
  },
  statsContainer: {
    backgroundColor: "#E2F0CB",
    padding: 10,
    borderRadius: 12,
  },
  categoryRow: {
    marginBottom: 10,
  },
  categoryText: {
    marginBottom: 5,
    fontWeight: "500",
  },
  placeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE5EC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  placeName: {
    fontWeight: "600",
    marginBottom: 4,
  },
  moodOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  moodOption: {
    backgroundColor: "#FFF",
    padding: 8,
    borderRadius: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  moodText: {
    fontSize: 18,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: "#FFB5A7",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  saveBtnText: {
    fontWeight: "bold",
    color: "#333",
  },
  moodLog: {
    backgroundColor: "#D0F4DE",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  mood: {
    fontSize: 16,
    fontWeight: "bold",
  },
  moodDesc: {
    fontStyle: "italic",
    marginVertical: 4,
  },
  moodTime: {
    textAlign: "right",
    fontSize: 12,
    color: "#555",
  },
});
