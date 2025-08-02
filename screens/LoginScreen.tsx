import React, { useState } from "react";
import { SafeAreaView, View, Image, Text, TextInput, Alert} from "react-native";
import SignUpstyles from "./SignUpStylesheet.styles";
import SwipeButton from "rn-swipe-button";
import { login } from "../services/authService";
const LoginScreen = ({navigation}) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () =>{
        login(email,password)
    }
    return(
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
            onSwipeSuccess={handleLogin}
            containerStyles={{ borderRadius: 25 }}
          />
        </View>
      </View>
    </SafeAreaView>
    );
}
export default LoginScreen;