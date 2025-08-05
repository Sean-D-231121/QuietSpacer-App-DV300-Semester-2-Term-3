// screens/Bookmarks.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

 const  Bookmarks = () => {
    const places = [
      {
        name: "Botanical Garden Pretoria",
        location: "Cussonia Avenue, Brummeria",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/e/e9/Pretoria_National_Botanical_Garden_Palms_and_Trees.jpg",
      },
      {
        name: "Botanical Garden Pretoria",
        location: "Cussonia Avenue, Brummeria",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/e/e9/Pretoria_National_Botanical_Garden_Palms_and_Trees.jpg",
      },
    ];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Bookmarks</Text>
      </View>

      {places.map((place, index) => (
        <View style={styles.card} key={index}>
          <Image source={{ uri: place.image }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{place.name}</Text>
            <Text style={styles.cardLocation}>📍 {place.location}</Text>
            <TouchableOpacity style={styles.goButton}>
              <Text style={styles.goText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}


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
