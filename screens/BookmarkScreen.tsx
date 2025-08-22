import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SwipeButton from "rn-swipe-button";

import {
  getBookmarksFromFirestore,
  removeBookmarkFromFirestore,
  getReviewsForPlace, // 👈 add this
} from "../services/DbService";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons"; // 👈 for calm feather icon

type RootStackParamList = {
  Home: { animateTo: { latitude: number; longitude: number } };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const getAddressFromCoords = async (lat: number, long: number) => {
  try {
    const geocode = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });
    if (geocode.length > 0) {
      const { city, region, country } = geocode[0];
      return `${city || region || "Unknown"}, ${country || ""}`;
    }
  } catch (err) {
    console.error("Error reverse geocoding:", err);
  }
  return `(${lat.toFixed(3)}, ${long.toFixed(3)})`; // fallback
};

const Bookmarks = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const fetchBookmarks = async () => {
    const bookmarks = await getBookmarksFromFirestore();

    const enriched = await Promise.all(
      bookmarks.map(async (p) => {
        let location = "";
        if (p.lat && p.long) {
          location = await getAddressFromCoords(p.lat, p.long);
        }

        // 👇 fetch reviews & calculate calm score
        let calmScore: number | null = null;
        const reviews = await getReviewsForPlace(p.id);
        if (reviews && reviews.length > 0) {
          const total = reviews.reduce((sum, r) => sum + r.calm_score, 0);
          calmScore = parseFloat((total / reviews.length).toFixed(1));
        }

        return { ...p, location, calmScore };
      })
    );

    setPlaces(enriched);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBookmarks();
    }, [])
  );

  const handleLongPress = async (place: any) => {
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
          <Image
            source={{ uri: place.image_url || place.image }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{place.title || place.name}</Text>
            <Text style={styles.cardLocation}>
              📍 {place.location || place.category_name}
            </Text>

            {place.calmScore !== null ? (
              <Text style={styles.calmScore}>
                Calm Score: {place.calmScore}{" "}
                <Feather name="feather" size={14} color="gray" />
              </Text>
            ) : (
              <Text style={styles.notReviewed}>Not reviewed yet</Text>
            )}

            <View style={{ width: "100%", marginVertical: 10 }}>
              <SwipeButton
                thumbIconBackgroundColor="#5f636d"
                thumbIconBorderColor="#5f636d"
                railBackgroundColor="#add8e6"
                railFillBackgroundColor="#455A64"
                railFillBorderColor="#455A64"
                title="Swipe to Go"
                titleColor="#fff"
                onSwipeSuccess={() => {
                  if (place.latitude && place.longitude) {
                    navigation.navigate("Home", {
                      animateTo: {
                        latitude: place.latitude,
                        longitude: place.longitude,
                      },
                    });
                  } else if (place.lat && place.long) {
                    navigation.navigate("Home", {
                      animateTo: {
                        latitude: place.lat,
                        longitude: place.long,
                      },
                    });
                  } else {
                    console.warn("Place does not have valid coordinates");
                  }
                }}
                containerStyles={{ borderRadius: 25, height: 50 }}
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Bookmarks;

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
  calmScore: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    fontWeight: "600",
  },
  notReviewed: {
    fontSize: 14,
    color: "#777",
    fontStyle: "italic",
    marginBottom: 10,
  },
});
