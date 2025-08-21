import React, { useState } from "react";
import { SafeAreaView, View, Image, Text, TextInput, Alert, TouchableOpacity} from "react-native";
import SignUpstyles from "./SignUpStylesheet.styles";
import SwipeButton from "rn-swipe-button";
import { login } from "../services/authService";
const LoginScreen = ({navigation} :any) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
      try {
        await login(email, password);
      } catch (err: any) {
        Alert.alert(
          "Login Failed",
          err.message || "Please check your details."
        );
      }
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

        {/* Input Fields */}
        <View style={SignUpstyles.form}>
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

          <View style={SignUpstyles.swipeWrapper}>
            <SwipeButton
              thumbIconBackgroundColor="#5f636d"
              thumbIconBorderColor="#5f636d"
              railBackgroundColor="#add8e6"
              railFillBackgroundColor="#5f636d"
              railFillBorderColor="#5f636d"
              title="Swipe to Sign Up"
              titleColor="#fff"
              onSwipeSuccess={handleLogin}
              containerStyles={{ borderRadius: 25 }}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{ color: "#5f636d", textAlign: "center", marginTop: 15 }}
            >
              Don't have an account?{" "}
              <Text style={{ fontWeight: "bold" }}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}
export default LoginScreen;