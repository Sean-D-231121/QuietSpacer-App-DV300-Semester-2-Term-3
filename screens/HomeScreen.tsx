// HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

const HomeScreen = () => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [locationGranted, setLocationGranted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeName, setPlaceName] = useState("");

  const markers = [
    { id: 1, latitude: -25.7545, longitude: 28.2314 },
    { id: 2, latitude: -25.7555, longitude: 28.229 },
    { id: 3, latitude: -25.753, longitude: 28.233 },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      setLocationGranted(true);

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {region && (
        <MapView
          style={StyleSheet.absoluteFillObject}
          region={region}
          showsUserLocation
         
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={`Location ${marker.id}`}
            >
              <Image
                source={require("../assets/Pin.png")}
                style={styles.pinIcon}
              />
            </Marker>
          ))}
        </MapView>
      )}

      {/* Hamburger Menu */}
      <TouchableOpacity style={styles.menuButton}>
        <Entypo name="menu" size={28} color="white" />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Where to?"
          style={styles.searchInput}
          placeholderTextColor="#333"
        />

        {/* Add Place Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Add Place Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Place</Text>
            <TextInput
              placeholder="Place name"
              style={styles.modalInput}
              value={placeName}
              onChangeText={setPlaceName}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                console.log("Place added:", placeName);
                setPlaceName("");
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: "#999", marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#ffaaa5",
    padding: 12,
    borderRadius: 16,
    zIndex: 10,
  },
  searchBarContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: "#fdf5e6",
    borderRadius: 25,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#add8e6",
    borderRadius: 25,
    flex: 1,
    height: 40,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#455A64",
    padding: 10,
    borderRadius: 25,
  },
  pinIcon: {
    width: 28,
    height: 35,
    resizeMode: "contain",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#455A64",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
