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
import SwipeButton from 'rn-swipe-button';
const SignupScreen =() => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

   const handleSignup = () => {
     // Handle actual signup logic here
     alert("Signed Up Successfully!");
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

      {/* Profile Image Picker Placeholder */}
      <View style={SignUpstyles.avatar}>
        <AntDesign name="picture" size={32} color="black" />
      </View>

      {/* Input Fields */}
      <View style={SignUpstyles.form}>
        <Text style={SignUpstyles.label}>Username</Text>
        <TextInput
          style={SignUpstyles.input}
          placeholder=""
          value={username}
          onChangeText={setUsername}
        />

        <Text style={SignUpstyles.label}>Email</Text>
        <TextInput
          style={SignUpstyles.input}
          placeholder=""
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={SignUpstyles.label}>Password</Text>
        <TextInput
          style={SignUpstyles.input}
          placeholder=""
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={SignUpstyles.label}>Check Password</Text>
        <TextInput
          style={SignUpstyles.input}
          placeholder=""
          secureTextEntry
          value={checkPassword}
          onChangeText={setCheckPassword}
        />

        {/* Sign Up Button */}
        {/* Swipe Sign Up Button */}
        
          {/* Swipe Button */}
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
        
      </View>
    </SafeAreaView>
  );
}

export default SignupScreen;
