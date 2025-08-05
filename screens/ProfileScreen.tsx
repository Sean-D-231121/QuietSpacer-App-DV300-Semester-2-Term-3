// screens/Profile.js
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
const Profile =() => {
    const places = [
      {
        name: "Botanical gardens",
        times: 50,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/e/e9/Pretoria_National_Botanical_Garden_Palms_and_Trees.jpg",
      },
      {
        name: "",
        times: 20,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/58/South_Africa-0378_-_Walter_Sisulu_Botanical_Gardens.jpg",
      },
      {
        name: "",
        times: 15,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/40/Kirstenbosch_garden_%28169079508%29.jpeg",
      },
      {
        name: "",
        times: 10,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/7/7f/Company%27s_Garden%2C_Cape_Town.jpg",
      },
      {
        name: "",
        times: 5,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/9/95/Durban_Botanic_Gardens.jpg",
      },
    ];
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
        style={styles.avatar}
      />

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <View style={styles.bluePill}>
        <Text style={styles.value}>Elnacho52</Text>
      </View>

      {/* What I like */}
      <Text style={styles.label}>What I like?</Text>
      <View style={styles.blueBox}>
        <Text style={styles.textContent}>
          I’m a curious and creative thinker who enjoys exploring new ideas and
          solving problems in unique ways. I have a passion for technology and
          design, and I love building things that make life easier for others. I
          value meaningful connections and always try to support the people
          around me.
        </Text>
      </View>

      {/* Categories */}
      <Text style={styles.label}>Categories that I like?</Text>
      <View style={styles.bluePill}></View>

      {/* Favourite Places */}
      <Text style={styles.label}>Favourite places</Text>
      <View style={styles.table}>
        <View style={styles.tableRowHeader}>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>Times visited</Text>
        </View>
        {places.map((place, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.placeCell}>
              <Image source={{ uri: place.image }} style={styles.placeImage} />
              <Text>{place.name}</Text>
            </View>
            <Text style={styles.times}>{place.times}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
export default Profile


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff8e7",
    padding: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#444",
  },
  bluePill: {
    backgroundColor: "#a2dbe6",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    color: "#444",
  },
  blueBox: {
    backgroundColor: "#a2dbe6",
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
  textContent: {
    fontSize: 14,
    color: "#333",
  },
  table: {
    marginTop: 10,
    backgroundColor: "#fca5a5",
    borderRadius: 20,
    padding: 10,
  },
  tableRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#444",
  },
  placeCell: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  times: {
    fontSize: 16,
    color: "#444",
  },
});
