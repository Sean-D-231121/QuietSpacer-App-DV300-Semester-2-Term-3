import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function SplashScreenComponent() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")} 
        style={styles.logo}
      />
      <Text style={styles.title}>QuietSpacer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3DD",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#5E6472",
  },
});
