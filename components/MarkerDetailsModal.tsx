import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { addMoodToFirestore } from "../services/DbService";
import SwipeButton from "rn-swipe-button";

type Props = {
  visible: boolean;
  marker: any | null;
  onClose: () => void;
  navigation: any;
};

const moodOptions = ["Happy", "Calm", "Excited", "Sad", "Stressed"];

const MarkerDetailsModal = ({
  visible,
  marker,
  onClose,
  navigation,
}: Props) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodDescription, setMoodDescription] = useState("");

  if (!marker) return null;

  const displayTitle =
    marker.title?.trim() || marker.name?.trim() || "Untitled";

  const addMoodLog = async () => {
    if (!selectedMood) return alert("Please select a mood!");

    const res = await addMoodToFirestore({
      placeId: marker.id,
      type: selectedMood,
      description: moodDescription.trim(),
    });

    if (res.success) {
      alert("Mood saved!");
      setSelectedMood(null);
      setMoodDescription("");
      onClose();
    } else {
      alert("Failed to save mood. Please try again.");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={onClose}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ width: "100%", alignItems: "center" }}
          >
            <ScrollView
              contentContainerStyle={styles.content}
              keyboardShouldPersistTaps="handled"
            >
              {marker.image_url && (
                <Image
                  source={{ uri: marker.image_url }}
                  style={styles.image}
                />
              )}
              <Text style={styles.title}>{displayTitle}</Text>
              {marker.description && (
                <Text style={styles.description}>{marker.description}</Text>
              )}

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
                multiline
              />

              <SwipeButton
                thumbIconBackgroundColor="#5f636d"
                thumbIconBorderColor="#5f636d"
                railBackgroundColor="#add8e6"
                railFillBackgroundColor="#5f636d"
                railFillBorderColor="#5f636d"
                height={55}
                width={300}
                title="Swipe to Save Mood"
                titleColor="#555"
                titleFontSize={16}
                onSwipeSuccess={addMoodLog}
              />

              <SwipeButton
                thumbIconBackgroundColor="#5f636d"
                thumbIconBorderColor="#5f636d"
                railBackgroundColor="#add8e6"
                railFillBackgroundColor="#5f636d"
                railFillBorderColor="#5f636d"
                height={55}
                width={300}
                title="Go to Place Details"
                titleColor="#555"
                titleFontSize={16}
                onSwipeSuccess={() => {
                  onClose();
                  navigation.navigate("PlaceDetails", { marker });
                }}
              />

              <TouchableOpacity onPress={onClose}>
                <Text style={{ color: "#999", marginTop: 10 }}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MarkerDetailsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  content: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
  },
  image: { width: 100, height: 100, borderRadius: 10, marginBottom: 15 },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  moodOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
  },
  moodOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: "#eee",
    margin: 5,
  },
  moodText: { fontSize: 14 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: 200,
    minHeight: 60,
    marginBottom: 12,
    textAlignVertical: "top",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
