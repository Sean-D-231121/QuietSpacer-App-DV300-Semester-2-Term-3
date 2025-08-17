// screens/Bookmarks.js
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { getBookmarksFromFirestore, removeBookmarkFromFirestore } from "../services/DbService";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

type RootStackParamList = {
  Home: { animateTo: { latitude: number; longitude: number } };

};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;


const Bookmarks = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const fetchBookmarks = async () => {
    const bookmarks = await getBookmarksFromFirestore();
    setPlaces(bookmarks);
  };

    useFocusEffect(
      React.useCallback(() => {
        fetchBookmarks();
      }, [])
    );

  const handleGo = (place: any) => {
    // Navigate to HomeScreen and pass coordinates to animate
    navigation.navigate("Home", {
      animateTo: {
        latitude: place.lat || place.latitude,
        longitude: place.long || place.longitude,
      },
    });
  };

  const handleLongPress = async (place: any) => {
    // Remove bookmark and refresh list
    await removeBookmarkFromFirestore(place.id);
    fetchBookmarks();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Bookmarks</Text>
      </View>

      {places.map((place, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onLongPress={() => handleLongPress(place)}
          delayLongPress={400}
        >
          <Image source={{ uri: place.image_url || place.image }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{place.title || place.name}</Text>
            <Text style={styles.cardLocation}>📍 {place.location || place.category_name}</Text>
            <TouchableOpacity style={styles.goButton} onPress={() => handleGo(place)}>
              <Text style={styles.goText}>Go</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


export default Bookmarks
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff8e7",
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuIcon: {
    backgroundColor: "#F28B82",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#444",
  },
  card: {
    backgroundColor: "#fca5a5",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 5,
  },
  cardLocation: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  goButton: {
    backgroundColor: "#a2dbe6",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  goText: {
    color: "#333",
    fontWeight: "bold",
  },
});
