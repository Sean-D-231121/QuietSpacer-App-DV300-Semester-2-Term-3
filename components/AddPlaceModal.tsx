import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import SwipeButton from "rn-swipe-button";
import * as ImagePicker from "expo-image-picker";
import { Dropdown } from "react-native-element-dropdown";

type Props = {
  visible: boolean;
  onClose: () => void;
  addPlaceToFirestore: (place: any) => Promise<any>;
  categories: { id: string; name: string }[];
  setCustomMarkers: React.Dispatch<React.SetStateAction<any[]>>;
  coords: { latitude: number; longitude: number } | null;
};

const AddPlaceModal = ({
  visible,
  onClose,
  addPlaceToFirestore,
  categories,
  setCustomMarkers,
  coords,
}: Props) => {
  const [placeName, setPlaceName] = useState("");
  const [placePrice, setPlacePrice] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [placeCategory, setPlaceCategory] = useState("");
  const [placeImage, setPlaceImage] = useState<string>("");

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets?.length > 0) {
      setPlaceImage(result.assets[0].uri);
    }
  };

  const saveMarker = async () => {
    if (!placeName.trim()) {
      alert("Please enter a place name.");
      return;
    }
    if (!coords) {
      alert("Coordinates missing. Try again.");
      return;
    }

    const newMarker = {
      id: Date.now(),
      latitude: coords.latitude,
      longitude: coords.longitude,
      title: placeName,
      price: placePrice,
      description: placeDescription,
      category: placeCategory,
      image_url: placeImage,
    };

    setCustomMarkers((prev) => [...prev, newMarker]);

    const result = await addPlaceToFirestore({
      name: placeName,
      description: placeDescription,
      price: placePrice,
      lat: newMarker.latitude,
      long: newMarker.longitude,
      category_name: placeCategory,
      image_uri: placeImage,
    });

    if (result.success) {
      alert("Place saved!");
    } else {
      alert("Error saving place.");
    }

    setPlaceName("");
    setPlacePrice("");
    setPlaceDescription("");
    setPlaceCategory("");
    setPlaceImage("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        {/* Backdrop to close when tapping OUTSIDE the card */}
        <Pressable style={styles.backdrop} onPress={onClose} />

        {/* Card content – taps inside here won't close the modal */}
        <View style={styles.content}>
          <Text style={styles.title}>Add New Place</Text>

          {/* Tappable image area */}
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.7}
            style={styles.imagePicker}
          >
            {placeImage ? (
              <Image source={{ uri: placeImage }} style={styles.imageFull} />
            ) : (
              <Text style={styles.imagePlaceholder}>Tap to select photo</Text>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Place name"
            style={styles.input}
            value={placeName}
            onChangeText={setPlaceName}
          />
          <TextInput
            placeholder="Price"
            style={styles.input}
            keyboardType="numeric"
            value={placePrice}
            onChangeText={setPlacePrice}
          />
          <TextInput
            placeholder="Description"
            style={[styles.input, { height: 60 }]}
            multiline
            value={placeDescription}
            onChangeText={setPlaceDescription}
          />

          <View style={{ width: "100%", marginBottom: 10 }}>
            <Dropdown
              style={styles.dropdown}
              data={categories.map((c) => ({ label: c.name, value: c.name }))}
              labelField="label"
              valueField="value"
              placeholder="Select a category"
              value={placeCategory}
              onChange={(item) => setPlaceCategory(item.value)}
            />
          </View>

          <View style={{ width: "100%", marginVertical: 10 }}>
            <SwipeButton
              title="Swipe to Save"
              titleColor="#fff"
              thumbIconBackgroundColor="#5f636d"
              railBackgroundColor="#add8e6"
              railFillBackgroundColor="#455A64"
              onSwipeSuccess={saveMarker}
              containerStyles={{ borderRadius: 25, height: 50 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddPlaceModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  // full-screen invisible click target behind the card
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    maxWidth: 520,
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "#fff",
  },

  // Image picker styles
  imagePicker: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imageFull: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    color: "#888",
    fontSize: 14,
  },
});
