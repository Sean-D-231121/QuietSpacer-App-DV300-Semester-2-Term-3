import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const HomeScreen = () => {
  const region = {
    latitude: -25.7545,
    longitude: 28.2314,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const markers = [
    { id: 1, latitude: -25.7545, longitude: 28.2314 },
    { id: 2, latitude: -25.7555, longitude: 28.229 },
    { id: 3, latitude: -25.753, longitude: 28.233 },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        userInterfaceStyle="dark"
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
              source={require("../assets/Pin.png")} // custom pin icon
              style={styles.pinIcon}
            />
          </Marker>
        ))}
      </MapView>

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
      </View>
    </View>
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
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#add8e6",
    borderRadius: 25,
    width: "95%",
    height: 40,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  pinIcon: {
    width: 28,
    height: 35,
    resizeMode: "contain",
  },
});
