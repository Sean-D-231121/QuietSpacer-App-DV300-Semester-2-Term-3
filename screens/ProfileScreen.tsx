import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { getUserProfile } from "../services/DbService";
import { auth } from "../firebase";

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) return;
      const userProfile = await getUserProfile(auth.currentUser.uid);
      if (userProfile) setProfileData(userProfile);
    };

    fetchProfile();
  }, []);

  if (!profileData) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: profileData.profile_pic || "https://placekitten.com/200/200",
        }}
        style={styles.profilePic}
      />
      <Text style={styles.label}>Username</Text>
      <Text style={styles.username}>{profileData.username}</Text>

      <Text style={styles.label}>Bio</Text>
      <Text style={styles.bio}>{profileData.bio || "No bio yet."}</Text>

      <Text style={styles.label}>Mood History</Text>
      {profileData.moods && profileData.moods.length > 0 ? (
        profileData.moods.map((entry: any) => (
          <View key={entry.id} style={styles.moodLog}>
            <Text style={styles.mood}>{entry.type}</Text>
            <Text style={styles.moodDesc}>{entry.description}</Text>
            <Text style={styles.moodTime}>
              {new Date(entry.date).toLocaleString()}
            </Text>
          </View>
        ))
      ) : (
        <Text>No moods logged yet.</Text>
      )}
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
