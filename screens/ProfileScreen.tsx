import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getUserProfile, updateUserProfile } from "../services/DbService";
import { auth } from "../firebase";
import { updateEmail, updatePassword } from "firebase/auth";
import SwipeButton from "rn-swipe-button";

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) return;
      const userProfile = await getUserProfile(auth.currentUser.uid);
      if (userProfile) {
        setProfileData(userProfile);
        setUsername(userProfile.username || "");
        setEmail(userProfile.email || "");
        setProfilePic(userProfile.profile_pic || "");
        setBio(userProfile.bio || "");
      }
    };
    fetchProfile();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;

    try {
      if (email && email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, email);
      }

      if (password) {
        await updatePassword(auth.currentUser, password);
      }
      await updateUserProfile(auth.currentUser.uid, {
        username,
        email,
        profile_pic: profilePic,
        bio,
      });

      alert("Profile updated!");
    } catch (err: any) {
      console.error("Update error:", err);
      alert(err.message);
    }
  };

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
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{
            uri: profilePic || "https://placekitten.com/200/200",
          }}
          style={styles.profilePic}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter new password"
      />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        value={bio}
        onChangeText={setBio}
        multiline
        placeholder="Tell us something about yourself..."
      />

      <View style={styles.swipeWrapper}>
        <SwipeButton
          thumbIconBackgroundColor="#5f636d"
          thumbIconBorderColor="#5f636d"
          railBackgroundColor="#add8e6"
          railFillBackgroundColor="#5f636d"
          railFillBorderColor="#5f636d"
          title="Save Changes"
          titleColor="#fff"
          onSwipeSuccess={handleSave}
          containerStyles={{ borderRadius: 25 }}
          width={300}

        />
      </View>

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
  swipeButton: {
    marginTop: 30,
    backgroundColor: "#add8e6",
    borderRadius: 25,
    paddingVertical: 15,
    
    alignItems: "center",
    justifyContent: "center",
  },
  swipeThumb: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  swipeText: {
    fontSize: 16,
    color: "#5f636d",
    fontWeight: "bold",
  },
  swipeWrapper: {
    marginTop: 30,
    margin: "auto"
  },
});
