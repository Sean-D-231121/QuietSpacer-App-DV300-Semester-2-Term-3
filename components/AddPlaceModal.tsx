import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import SwipeButton from "rn-swipe-button";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
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
      image_url: placeImage,
    });

    if (result.success) {
      alert("Place saved!");
    } else {
      alert("Error saving place.");
    }

    // reset
    setPlaceName("");
    setPlacePrice("");
    setPlaceDescription("");
    setPlaceCategory("");
    setPlaceImage("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={styles.content}>
          <Text style={styles.title}>Add New Place</Text>

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

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Select Photo</Text>
          </TouchableOpacity>
          {placeImage ? (
            <Image source={{ uri: placeImage }} style={styles.preview} />
          ) : null}

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
        </TouchableOpacity>
      </TouchableOpacity>
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
  },
  content: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "100%",
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
  },
  button: {
    backgroundColor: "#455A64",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  preview: { width: 80, height: 80, marginBottom: 10, borderRadius: 10 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
    overflow: "hidden", // makes border radius work on Picker
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
});
