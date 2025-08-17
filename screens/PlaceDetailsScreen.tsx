import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import { addBookmarkToFirestore, removeBookmarkFromFirestore, getBookmarksFromFirestore } from "../services/DbService";
import { useRoute, useNavigation} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
 type RootStackParamList = {
  Homescreen: { animateTo: { latitude: number; longitude: number } };

};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Homescreen">;

const PlaceDetails = () =>{
  
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const marker = route.params?.marker;
  const [bookmarked, setBookmarked] = useState(false);

   useEffect(() => {
     // Check if this place is already bookmarked
     const checkBookmark = async () => {
       const bookmarks = await getBookmarksFromFirestore();
       setBookmarked(bookmarks.some((b) => b.id === marker.id));
     };
     checkBookmark();
   }, [marker]);

   const handleBookmark = async () => {
     if (bookmarked) {
       await removeBookmarkFromFirestore(marker.id);
       setBookmarked(false);
     } else {
       await addBookmarkToFirestore(marker);
       setBookmarked(true);
     }
   };
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri:
            marker?.image_url ||
            "https://upload.wikimedia.org/wikipedia/commons/e/e9/Pretoria_National_Botanical_Garden_Palms_and_Trees.jpg",
        }}
        style={styles.image}
      />

      {/* Header Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={handleBookmark}>
            <MaterialIcons
              name={bookmarked ? "bookmark" : "bookmark-border"}
              size={24}
              color={bookmarked ? "#F28B82" : "#444"}
              style={{ marginRight: 12 }}
            />
          </TouchableOpacity>
          <Feather name="share-2" size={20} color="#444" />
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {marker?.title || marker?.name || "Botanical Garden"}
        </Text>
        <Text style={styles.subtitle}>
          {marker?.category_name || "Pretoria"}
        </Text>
        <Text style={styles.location}>
          📍 {marker?.location || "Cussonia Avenue, Brummeria"}
        </Text>
        <Text style={styles.price}>
          Price : {marker?.price ? `R${marker.price}` : "N/A"}
        </Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.description}>
            {marker?.description ||
              "The Pretoria National Botanical Garden is one of South Africa's nine national botanical gardens..."}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            if (marker && marker.latitude && marker.longitude) {
              navigation.navigate('Homescreen', {
                animateTo: {
                  latitude: marker.latitude || marker.lat,
                  longitude: marker.longitude || marker.long,
                },
              });
            } else if (marker && marker.lat && marker.long) {
              navigation.navigate('Homescreen', {
                animateTo: {
                  latitude: marker.lat,
                  longitude: marker.long,
                },
              });
            } else {
              console.warn("Marker does not have valid coordinates");
            }
          }}
        >
          <Text style={styles.goText}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* Reviews */}
      <Text style={styles.reviewHeader}>Reviews</Text>
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeaderRow}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={styles.avatar}
          />
          <Text style={styles.reviewTitle}>Wonderful and quiet....</Text>
          <View style={styles.reviewRatingRow}>
            <Text>3</Text>
            <Feather
              name="feather"
              size={14}
              color="gray"
              style={{ marginLeft: 5 }}
            />
          </View>
        </View>
        <Text style={styles.reviewText}>
          I love spending time in botanical gardens—they’re peaceful and full of
          life. Walking among the flowers and towering trees helps me feel calm
          and grounded. I enjoy reading the little signs and learning about
          different plant species from around the world. There’s something
          special about the quiet beauty of nature carefully arranged and cared
          for.
        </Text>
      </View>
    </ScrollView>
  );
};
export default PlaceDetails


const styles = StyleSheet.create({
  container: { backgroundColor: "#fff8e7" },
  image: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: -40,
  },
  menuIcon: {
    backgroundColor: "#F28B82",
    padding: 10,
    borderRadius: 10,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  calmText: {
    marginRight: 5,
    fontSize: 14,
    color: "#333",
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  descriptionBox: {
    backgroundColor: "#d2ecf7",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  goButton: {
    backgroundColor: "#455A64",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  goText: {
    color: "#fff",
    fontSize: 16,
  },
  reviewHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: "#d2ecf7",
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 15,
  },
  reviewHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewTitle: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  reviewRatingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
  },
});

