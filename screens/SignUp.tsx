import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import SignUpstyles from "./SignUpStylesheet.styles";
import { AntDesign } from "@expo/vector-icons";
import SwipeButton from "rn-swipe-button";
import { SignUp } from "../services/authService";
import * as ImagePicker from "expo-image-picker";

const SignupScreen = ({ navigation } : any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
const [image, setImage] = useState<string | null>(null);

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};
  const handleSignup = () => {
    SignUp(username, email, password, checkPassword, image || undefined);
  };

  return (
    <SafeAreaView style={SignUpstyles.container}>
      {/* Logo */}
      <View style={SignUpstyles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={SignUpstyles.logoImage}
        />
        <Text style={SignUpstyles.logoText}>
          <Text style={{ color: "#5f636d" }}>Quiet</Text>
          <Text style={{ color: "#5f636d", fontWeight: "300" }}>Spacer</Text>
        </Text>
      </View>

      
      <TouchableOpacity onPress={pickImage} style={SignUpstyles.avatar}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        ) : (
          <AntDesign name="picture" size={32} color="black" />
        )}
      </TouchableOpacity>

      
      <View style={SignUpstyles.form}>
        <Text style={SignUpstyles.label}>Username</Text>
        <TextInput
          style={SignUpstyles.input}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={SignUpstyles.label}>Email</Text>
        <TextInput
          style={SignUpstyles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={SignUpstyles.label}>Password</Text>
        <TextInput
          style={SignUpstyles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={SignUpstyles.label}>Check Password</Text>
        <TextInput
          style={SignUpstyles.input}
          secureTextEntry
          value={checkPassword}
          onChangeText={setCheckPassword}
        />

        <View style={SignUpstyles.swipeWrapper}>
          <SwipeButton
            thumbIconBackgroundColor="#5f636d"
            thumbIconBorderColor="#5f636d"
            railBackgroundColor="#add8e6"
            railFillBackgroundColor="#5f636d"
            railFillBorderColor="#5f636d"
            title="Swipe to Sign Up"
            titleColor="#fff"
            onSwipeSuccess={handleSignup}
            containerStyles={{ borderRadius: 25 }}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{ color: "#5f636d", textAlign: "center", marginTop: 15 }}
          >
            Already have an account?{" "}
            <Text style={{ fontWeight: "bold" }}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
