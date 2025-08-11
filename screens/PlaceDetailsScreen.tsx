import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import * as Location from "expo-location";

export default function PlaceDetails() {
  const route = useRoute();
  const marker = route.params?.marker || {};
  const [address, setAddress] = React.useState<string>("");
  const [reviewModalVisible, setReviewModalVisible] = React.useState(false);
  const [reviewText, setReviewText] = React.useState("");
  const [reviews, setReviews] = React.useState([
    {
      user: "John Doe",
      text: "Wonderful and quiet....",
      rating: 3,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ]);

  React.useEffect(() => {
    async function fetchAddress() {
      if (marker.latitude && marker.longitude) {
        try {
          const geo = await Location.reverseGeocodeAsync({
            latitude: marker.latitude,
            longitude: marker.longitude,
          });
          if (geo && geo.length > 0) {
            const g = geo[0];
            setAddress(
              [g.name, g.street, g.city, g.region, g.country]
                .filter(Boolean)
                .join(", ")
            );
          } else {
            setAddress("");
          }
        } catch (e) {
          setAddress("");
        }
      }
    }
    fetchAddress();
  }, [marker.latitude, marker.longitude]);

  const handleAddReview = () => {
    if (reviewText.trim() !== "") {
      setReviews([
        ...reviews,
        {
          user: "Anonymous",
          text: reviewText,
          rating: 3,
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
      ]);
      setReviewText("");
      setReviewModalVisible(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: marker.image_url
            ? marker.image_url
            : "https://upload.wikimedia.org/wikipedia/commons/e/e9/Pretoria_National_Botanical_Garden_Palms_and_Trees.jpg",
        }}
        style={styles.image}
      />

      {/* Header Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.iconRow}>
          <Text style={styles.calmText}>Calm 3.5/5</Text>
          <Feather
            name="feather"
            size={16}
            color="gray"
            style={{ marginRight: 12 }}
          />
          <Entypo
            name="location-pin"
            size={20}
            color="#444"
            style={{ marginRight: 12 }}
          />
          <MaterialIcons
            name="bookmark-border"
            size={20}
            color="#444"
            style={{ marginRight: 12 }}
          />
          <Feather name="share-2" size={20} color="#444" />
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {marker.title || marker.name || "Place"}
        </Text>
        <Text style={styles.subtitle}>
          {marker.category || marker.category_name || "Category"}
        </Text>
        <Text style={styles.location}>
          📍{" "}
          {address
            ? address
            : marker.latitude && marker.longitude
            ? `${marker.latitude}, ${marker.longitude}`
            : "Location"}
        </Text>
        <Text style={styles.price}>
          Price :{" "}
          {marker.price ? `R${marker.price}` : "N/A"}
        </Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.description}>
            {marker.description || "No description provided."}
          </Text>
        </View>
        <TouchableOpacity style={styles.goButton}>
          <Text style={styles.goText}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* Reviews */}
      <Text style={styles.reviewHeader}>Reviews</Text>
      <TouchableOpacity
        style={[styles.goButton, { marginLeft: 20, marginBottom: 10 }]}
        onPress={() => setReviewModalVisible(true)}
      >
        <Text style={styles.goText}>Add Review</Text>
      </TouchableOpacity>
      {reviews.map((review, idx) => (
        <View style={styles.reviewCard} key={idx}>
          <View style={styles.reviewHeaderRow}>
            <Image source={{ uri: review.avatar }} style={styles.avatar} />
            <Text style={styles.reviewTitle}>
              {review.text.slice(0, 25)}
              {review.text.length > 25 ? "..." : ""}
            </Text>
            <View style={styles.reviewRatingRow}>
              <Text>{review.rating}</Text>
              <Feather
                name="feather"
                size={14}
                color="gray"
                style={{ marginLeft: 5 }}
              />
            </View>
          </View>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      ))}
      <Modal
        visible={reviewModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 20,
              width: "80%",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
            >
              Add Review
            </Text>
            <TextInput
              placeholder="Write your review..."
              value={reviewText}
              onChangeText={setReviewText}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
                minHeight: 60,
              }}
              multiline
            />
            <TouchableOpacity style={styles.goButton} onPress={handleAddReview}>
              <Text style={styles.goText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setReviewModalVisible(false)}>
              <Text style={{ color: "#999", marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

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
