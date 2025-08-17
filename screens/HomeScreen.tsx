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
  ActivityIndicator,
} from "react-native";
import MapView, { Marker} from "react-native-maps";
import { useNavigation, NavigationProp, useRoute, useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { addPlaceToFirestore, getAllPlacesFromFirestore } from "../services/DbService";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Keyboard, Animated } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import SwipeButton from "rn-swipe-button";
type MarkerData = {
  id: number;
  latitude: number;
  longitude: number;
  title?: string;
  name?: string;
};

type HomeStackParamList = {
  Home: undefined;
  PlaceDetails: { marker: MarkerData };
};

// Drawer navigator
type DrawerParamList = {
  Home: undefined; // points to HomeStack
  Bookmarks: undefined;
  Profile: undefined;
  "Sign Out": undefined;
};
type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Home"
>;

const HomeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [region, setRegion] = useState<null | {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>(null);

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [placePrice, setPlacePrice] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [placeCategory, setPlaceCategory] = useState("");
  const [customMarkers, setCustomMarkers] = useState<any[]>([]);
  const [selectedCoords, setSelectedCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [markerId, setMarkerId] = useState(100);
  const [placeImage, setPlaceImage] = useState<string>("");
  const [dbMarkers, setDbMarkers] = useState<any[]>([]);

  // Modal state for marker details
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
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
  

  
  

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height, // extra padding
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardHeight, {
        toValue: 0, // original bottom padding
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // If navigation param animateTo is present, animate the map
      if (route.params && (route.params as any).animateTo && mapRef.current) {
        const { latitude, longitude } = (route.params as any).animateTo;
        mapRef.current.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          800
        );
      }
    }, [route.params])
  );

  // Search state and ref for MapView
  const [search, setSearch] = useState("");
  const mapRef = React.useRef<MapView>(null);

  // Search handler: only search Firestore pins
  const handleSearch = () => {
    const found = dbMarkers.find(
      (m) =>
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
      // Fetch places from Firestore
      const result = await getAllPlacesFromFirestore();
      if (result.success) {
        setDbMarkers(result.places || []);
      } else {
        setDbMarkers([]);
      }
      setLoading(false);
    })();
    
  }, []);

  const handleLongPress = (event: any) => {
    const coords = event.nativeEvent.coordinate;
    setSelectedCoords(coords);
    setModalVisible(true);
  };

  const saveMarker = async () => {
    if (selectedCoords && placeName.trim() !== "") {
      const newMarker = {
        id: markerId,
        latitude: selectedCoords.latitude,
        longitude: selectedCoords.longitude,
        title: placeName,
        price: placePrice,
        description: placeDescription,
        category: placeCategory,
        image_url: placeImage,
      };
      setCustomMarkers((prev) => [...prev, newMarker]);
      setMarkerId(markerId + 1);
      const result = await addPlaceToFirestore({
        name: placeName,
        description: placeDescription,
        price: placePrice,
        lat: selectedCoords.latitude,
        long: selectedCoords.longitude,
        category_name: placeCategory,
        image_url: placeImage,
      });
      if (result.success) {
        alert("Place saved to database!");
      } else {
        alert(
          "Error saving place: " +
            (typeof result.error === "object" && result.error !== null && "message" in result.error
              ? (result.error as { message: string }).message
              : String(result.error))
        );
        console.error(result.error);
      }
    } else {
      alert("Please fill in all required fields and select a location.");
    }
    setPlaceName("");
    setPlacePrice("");
    setPlaceDescription("");
    setPlaceCategory("");
    setPlaceImage("");
    setSelectedCoords(null);
    setModalVisible(false);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPlaceImage(result.assets[0].uri);
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
        onLongPress={handleLongPress}
      >
        {/* Predefined markers */}
        {predefinedMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            onPress={() => {
              setSelectedMarker(marker);
              setDetailsModalVisible(true);
            }}
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
            onPress={() => {
              setSelectedMarker(marker);
              setDetailsModalVisible(true);
            }}
          >
            <Image
              source={require("../assets/Pin.png")}
              style={styles.pinIcon}
            />
          </Marker>
        ))}
        {/* Firestore markers */}
        {dbMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.long,
            }}
            title={marker.title || marker.name}
            onPress={() => {
              setSelectedMarker(marker);
              setDetailsModalVisible(true);
            }}
          >
            <Image
              source={require("../assets/Pin.png")}
              style={styles.pinIcon}
            />
          </Marker>
        ))}
      </MapView>

      {/* Marker Details Modal */}
      <Modal
        visible={detailsModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setDetailsModalVisible(false)}
      >
        <View style={styles.detailsModalContainer}>
          <View style={styles.detailsModalContent}>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
            >
              {typeof selectedMarker?.title === "string" &&
              selectedMarker.title.trim() !== ""
                ? selectedMarker.title
                : typeof selectedMarker?.name === "string" &&
                  selectedMarker.name.trim() !== ""
                ? selectedMarker.name
                : "Untitled"}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setDetailsModalVisible(false);
                if (selectedMarker) {
                  navigation.navigate("PlaceDetails", {
                    marker: selectedMarker,
                  });
                }
              }}
            >
              <Text style={styles.modalButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDetailsModalVisible(false)}>
              <Text style={{ color: "#999", marginTop: 10 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Animated.View
        style={[styles.searchBarContainer, { bottom: keyboardHeight }]}
      >
        <TextInput
          placeholder="Where to?"
          style={styles.searchInput}
          placeholderTextColor="#333"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Feather name="search" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Add Place Modal */}
      {/* Add Place Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        {/* Overlay to close modal */}
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          {/* Modal content */}
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Place</Text>

            {/* Place Name */}
            <TextInput
              placeholder="Place name"
              style={styles.modalInput}
              value={placeName}
              onChangeText={setPlaceName}
            />

            {/* Price */}
            <TextInput
              placeholder="Price (e.g. 0 or 50)"
              style={styles.modalInput}
              value={placePrice}
              onChangeText={setPlacePrice}
              keyboardType="numeric"
            />

            {/* Description */}
            <TextInput
              placeholder="Description"
              style={[styles.modalInput, { height: 60 }]}
              value={placeDescription}
              onChangeText={setPlaceDescription}
              multiline
            />

            {/* Category Picker */}
            <View style={[styles.modalInput, { padding: 0 }]}>
              <Picker
                selectedValue={placeCategory}
                onValueChange={(itemValue) => setPlaceCategory(itemValue)}
                style={{ height: 50, width: "100%" }}
              >
                <Picker.Item label="Select a category" value="" />
                <Picker.Item label="Lake" value="lake" />
                <Picker.Item label="Dam" value="dam" />
                <Picker.Item label="Restaurant" value="restaurant" />
                <Picker.Item label="Park" value="park" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>

            {/* Select Image */}
            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <Text style={styles.modalButtonText}>Select Photo</Text>
            </TouchableOpacity>
            {placeImage ? (
              <Image
                source={{ uri: placeImage }}
                style={{
                  width: 80,
                  height: 80,
                  marginBottom: 10,
                  borderRadius: 10,
                }}
              />
            ) : null}

            {/* Swipe to Save */}
            <View style={{ width: "100%", marginVertical: 10 }}>
              <SwipeButton
                thumbIconBackgroundColor="#5f636d"
                thumbIconBorderColor="#5f636d"
                railBackgroundColor="#add8e6"
                railFillBackgroundColor="#455A64"
                railFillBorderColor="#455A64"
                title="Swipe to Save"
                titleColor="#fff"
                onSwipeSuccess={saveMarker}
                containerStyles={{ borderRadius: 25, height: 50 }}
              />
            </View>

           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff8e7",
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
  searchButton: {
    backgroundColor: "#455A64",
    padding: 10,
    borderRadius: 25,
    marginRight: 8,
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
  detailsModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsModalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
});
