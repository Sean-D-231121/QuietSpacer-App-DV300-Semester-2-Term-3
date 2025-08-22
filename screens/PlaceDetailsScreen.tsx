import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  addBookmarkToFirestore,
  removeBookmarkFromFirestore,
  getBookmarksFromFirestore,
  addReviewToFirestore,
  getReviewsForPlace,
  Review,
} from "../services/DbService";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SwipeButton from "rn-swipe-button";
import * as Location from "expo-location"; // 👈 NEW
import { Dropdown } from "react-native-element-dropdown";

type RootStackParamList = {
  Homescreen: { animateTo: { latitude: number; longitude: number } };
  PlaceDetails: { marker: any};
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Homescreen"
>;
type PlaceDetailsRouteProp = RouteProp<RootStackParamList, "PlaceDetails">;



const PlaceDetails = () => {
  const route = useRoute<PlaceDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const marker: any = route.params?.marker;
  
  const [bookmarked, setBookmarked] = useState(false);
  const [address, setAddress] = useState<string>(""); 

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewScore, setReviewScore] = useState("1"); 
  const [overallCalmScore, setOverallCalmScore] = useState<number | null>(null);

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!marker?.id) return;
      const revs = await getReviewsForPlace(marker.id);
      setReviews(revs);
    };
    fetchReviews();
  }, [marker]);

  // After adding a review, refresh the list:
  const handleAddReview = async () => {
    if (!marker?.id) return;
    const result = await addReviewToFirestore({
      place_id: marker.id,
      title: reviewTitle,
      description: reviewDesc,
      calm_score: parseInt(reviewScore),
    });
    if (result.success) {
      setReviewTitle("");
      setReviewDesc("");
      setReviewScore("3");
      alert("Review added!");
      // Refresh reviews
      const revs = await getReviewsForPlace(marker.id);
      setReviews(revs);
    }
  };
  useEffect(() => {
    const checkBookmark = async () => {
      const bookmarks = await getBookmarksFromFirestore();
      setBookmarked(bookmarks.some((b) => b.id === marker.id));
    };
    checkBookmark();
  }, [marker]);

  useEffect(() => {
    if (reviews.length === 0) {
      setOverallCalmScore(null);
    } else {
      const total = reviews.reduce((sum, r) => sum + r.calm_score, 0);
      const avg = total / reviews.length;
      setOverallCalmScore(parseFloat(avg.toFixed(1))); // 1 decimal
    }
  }, [reviews]);


  // reverse geocode to get readable address
  useEffect(() => {
    const getAddress = async () => {
      if (marker?.lat && marker?.long) {
        try {
          const geocode = await Location.reverseGeocodeAsync({
            latitude: marker.lat,
            longitude: marker.long,
          });

          if (geocode.length > 0) {
            const { city, region, country } = geocode[0];
            setAddress(`${city || region || "Unknown"}, ${country || ""}`);
          }
        } catch (err) {
          console.warn("Reverse geocode failed:", err);
          setAddress(`(${marker.lat.toFixed(3)}, ${marker.long.toFixed(3)})`);
        }
      }
    };
    getAddress();
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

      {/* Title Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {marker?.title || marker?.name || "Botanical Garden"}
        </Text>
        <Text style={styles.subtitle}>
          {marker?.category_name || "Unknown Category"}
        </Text>
        <Text style={styles.location}>
          📍 {address || "Loading location..."}
        </Text>
        <Text style={styles.price}>
          Price : {marker?.price ? `R${marker.price}` : "N/A"}
        </Text>
        {overallCalmScore !== null && (
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#444" }}>
              Calm Score: {overallCalmScore}{" "}
              <Feather
                name="feather"
                size={14}
                color="gray"
                style={{ marginLeft: 5 }}
              />
            </Text>
          </View>
        )}
        <View style={styles.descriptionBox}>
          <Text style={styles.description}>
            {marker?.description ||
              "The Pretoria National Botanical Garden is one of South Africa's nine national botanical gardens..."}
          </Text>
        </View>
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
              if (marker && marker.latitude && marker.longitude) {
                navigation.navigate("Homescreen", {
                  animateTo: {
                    latitude: marker.latitude || marker.lat,
                    longitude: marker.longitude || marker.long,
                  },
                });
              } else if (marker && marker.lat && marker.long) {
                navigation.navigate("Homescreen", {
                  animateTo: {
                    latitude: marker.lat,
                    longitude: marker.long,
                  },
                });
              } else {
                console.warn("Marker does not have valid coordinates");
              }
            }}
            containerStyles={{ borderRadius: 25, height: 50 }}
          />
        </View>
      </View>

      {/* Reviews */}
      <View style={styles.reviewForm}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={reviewTitle}
          onChangeText={setReviewTitle}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Description"
          value={reviewDesc}
          onChangeText={setReviewDesc}
          multiline
        />
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: "1 - Very Low", value: "1" },
            { label: "2 - Low", value: "2" },
            { label: "3 - Medium", value: "3" },
            { label: "4 - High", value: "4" },
            { label: "5 - Very High", value: "5" },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select Calm Score"
          value={reviewScore}
          onChange={(item) => setReviewScore(item.value)}
        />
        <View style={styles.swipeWrapper}>
          <SwipeButton
            thumbIconBackgroundColor="#5f636d"
            thumbIconBorderColor="#5f636d"
            railBackgroundColor="#add8e6"
            railFillBackgroundColor="#5f636d"
            railFillBorderColor="#5f636d"
            title="Add Review"
            titleColor="#fff"
            onSwipeSuccess={handleAddReview}
            containerStyles={{ borderRadius: 25 }}
          />
        </View>
      </View>

      <Text style={styles.reviewHeader}>Reviews</Text>
      {reviews.length === 0 && (
        <Text style={{ marginHorizontal: 20, marginBottom: 40 }}>
          No reviews yet.
        </Text>
      )}
      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeaderRow}>
            <Image
              source={{
                uri:
                  review.profile_pic ||
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
              }}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.reviewTitle}>{review.title}</Text>
              <Text style={{ fontSize: 12, color: "#666" }}>
                {review.username || "Anonymous"}
              </Text>
            </View>
            <View style={styles.reviewRatingRow}>
              <Text>{review.calm_score}</Text>
              <Feather
                name="feather"
                size={14}
                color="gray"
                style={{ marginLeft: 5 }}
              />
            </View>
          </View>
          <Text style={styles.reviewText}>{review.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
export default PlaceDetails;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff8e7" },
  image: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    marginBottom: 30,
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
  reviewForm: {
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: "#fca5a5",
    padding: 15,
    borderRadius: 15,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  addButton: {
    backgroundColor: "#455A64",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  swipeButton: {
    marginTop: 30,
    backgroundColor: "#add8e6",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  swipeThumb: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  swipeText: {
    fontSize: 16,
    color: "#5f636d",
    fontWeight: "bold",
  },
  swipeWrapper: {
    marginTop: 30,
  },
});
