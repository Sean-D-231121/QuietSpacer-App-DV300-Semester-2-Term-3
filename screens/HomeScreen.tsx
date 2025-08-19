import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text,
  Animated,
} from "react-native";
import MapView from "react-native-maps";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import * as Location from "expo-location";
import {
  getAllPlacesFromFirestore,
  addPlaceToFirestore,
  getCategoriesFromFirestore,
} from "../services/DbService";

import MapMarkers from "../components/MapMarkers";
import SearchBar from "../components/SearchBar";
import AddPlaceModal from "../components/AddPlaceModal";
import MarkerDetailsModal from "../components/MarkerDetailsModal";

const HomeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const mapRef = useRef<MapView>(null);
  interface MarkerData {
    id: string | number;
    latitude?: number;
    longitude?: number;
    lat?: number;
    long?: number;
    title?: string;
    name?: string;
  }
  const [region, setRegion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [longPressCoords, setLongPressCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [dbMarkers, setDbMarkers] = useState<any[]>([]);
  const [customMarkers, setCustomMarkers] = useState<any[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [keyboardHeight] = useState(new Animated.Value(0));

  // Predefined markers
  const predefinedMarkers = [
    {
      id: 1,
      latitude: -25.7545,
      longitude: 28.2314,
      title: "Botanical Garden",
    },
    { id: 2, latitude: -25.7555, longitude: 28.229, title: "Calm Park" },
    { id: 3, latitude: -25.753, longitude: 28.233, title: "Quiet Spot" },
  ];

  // Fetch location & data
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      const result = await getAllPlacesFromFirestore();
      setDbMarkers(result.success ? result.places || [] : []);

      const catResult = await getCategoriesFromFirestore();
      setCategories(catResult.success ? catResult.categories || [] : []);
      setLoading(false);
    })();
  }, []);

  // Jump to place if navigated with param
  useFocusEffect(
    React.useCallback(() => {
      if (route.params && (route.params as any).animateTo && mapRef.current) {
        const { latitude, longitude } = (route.params as any).animateTo;
        mapRef.current.animateToRegion(
          { latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 },
          800
        );
      }
    }, [route.params])
  );

  // Search
  const handleSearch = () => {
    const found = dbMarkers.find((m) =>
      (m.title || m.name || "").toLowerCase().includes(search.toLowerCase())
    );
    if (found && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: found.lat,
          longitude: found.long,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        800
      );
      setSelectedMarker(found);
      setDetailsModalVisible(true);
    } else {
      alert("No Firestore pin found matching your search.");
    }
  };

  if (loading || !region) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#455A64" />
        <Text style={{ marginTop: 10 }}>Loading map...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        showsUserLocation
        onLongPress={(e) => {
          const coords = e.nativeEvent.coordinate;
          setLongPressCoords(coords);
          setModalVisible(true);
        }}
      >
        <MapMarkers
          predefinedMarkers={predefinedMarkers}
          customMarkers={customMarkers}
          dbMarkers={dbMarkers}
          setSelectedMarker={setSelectedMarker}
          setDetailsModalVisible={setDetailsModalVisible}
        />
      </MapView>

      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        openAddPlace={() => {}}
        keyboardHeight={keyboardHeight}
      />

      <MarkerDetailsModal
        visible={detailsModalVisible}
        marker={selectedMarker}
        onClose={() => setDetailsModalVisible(false)}
        navigation={navigation}
      />

      <AddPlaceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        addPlaceToFirestore={addPlaceToFirestore}
        categories={categories}
        setCustomMarkers={setCustomMarkers}
        coords={longPressCoords} // ✅ pass down coords
      />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff8e7",
  },
});
