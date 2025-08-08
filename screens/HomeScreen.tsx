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
import MapView, { Marker, Callout} from "react-native-maps";
import { Entypo, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";


type MarkerData = {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
};

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
  const [customMarkers, setCustomMarkers] = useState<MarkerData[]>([]);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [rating, setRating] = useState<number>(0);

  const [selectedCoords, setSelectedCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Existing static markers
  const predefinedMarkers = [
    { id: 1, latitude: -25.7545, longitude: 28.2314 },
    { id: 2, latitude: -25.7555, longitude: 28.229 },
    { id: 3, latitude: -25.753, longitude: 28.233 },
  ];

  useEffect(() => {
  (async () => {
    if (region.latitude !== 0 && region.longitude !== 0) return; // Prevent re-run
    
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


  const handleLongPress = (event: any) => {
    const coords = event.nativeEvent.coordinate;
    setSelectedCoords(coords);
    setModalVisible(true);
  };

  const [markerId, setMarkerId] = useState(1);

  const saveMarker = () => {
    if (selectedCoords && placeName.trim() !== "") {
      const newMarker = {
        id: markerId,
        latitude: selectedCoords.latitude,
        longitude: selectedCoords.longitude,
        title: placeName,
      };
      setCustomMarkers((prev) => [...prev, newMarker]);
      setMarkerId(markerId + 1);
    }
    setPlaceName("");
    setSelectedCoords(null);
    setModalVisible(false);
  };
  const [toolbarExpanded, setToolbarExpanded] = useState(false);
const sheetHeight = useSharedValue(70); // Initial collapsed height

const animatedSheetStyle = useAnimatedStyle(() => {
  return {
    height: withTiming(sheetHeight.value, { duration: 300 }),
  };
});

const toggleToolbar = () => {
  setToolbarExpanded(!toolbarExpanded);
  sheetHeight.value = toolbarExpanded ? 70 : 250; // Toggle between collapsed and expanded
};

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
          onLongPress={handleLongPress} // Long press to add marker
        >
          {/* Predefined markers */}
          {predefinedMarkers.map((marker) => (
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

          {/* Custom markers */}
          {customMarkers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
            >
              <Image
                source={require("../assets/Pin.png")}
                style={styles.pinIcon}
              />
              <Callout>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMarker(marker);
                    setDetailsModalVisible(true);
                  }}
                  style={{ padding: 5 }}
                >
                  <Text style={{ fontWeight: "bold" }}>{marker.title}</Text>
                  <Text style={{ color: "#007AFF", marginTop: 4 }}>
                    View Details
                  </Text>
                </TouchableOpacity>
              </Callout>
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
            <TouchableOpacity style={styles.modalButton} onPress={saveMarker}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: "#999", marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={detailsModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedMarker?.title || "Place Details"}
            </Text>

            <Text style={{ marginBottom: 10 }}>Rate this place:</Text>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              {[1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => setRating(num)}
                  style={[
                    styles.starButton,
                    rating >= num && styles.selectedStarButton,
                  ]}
                >
                  <Text style={{ color: rating >= num ? "#fff" : "#000" }}>
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setDetailsModalVisible(false);
                setRating(0);
              }}
            >
              <Text style={styles.modalButtonText}>Close</Text>
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
  starButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#eee",
  },

  selectedStarButton: {
    backgroundColor: "#455A64",
    borderColor: "#455A64",
  },
});
