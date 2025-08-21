import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SignupScreen from "./screens/SignUp";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PlaceDetails from "./screens/PlaceDetailsScreen";
import Profile from "./screens/ProfileScreen";
import Bookmarks from "./screens/BookmarkScreen";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { logout } from "./services/authService";
import "react-native-gesture-handler"; // top of file
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MoodDashboard from "./screens/moodDashboard";
import SplashScreenComponent from "./screens/SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "./screens/OnBoardingScreen";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();




function SignOutScreen() {
  useEffect(() => {
    logout();
  }, []);

  return <View />;
}
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Homescreen" component={HomeScreen} />
      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetails}
        listeners={({ navigation }) => ({
          blur: () => {
            // When leaving Home, reset stack so it goes back to Homescreen
            navigation.reset({
              index: 0,
              routes: [{ name: "Homescreen" }],
            });
          },
        })}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStack} />

      <Drawer.Screen name="Bookmarks" component={Bookmarks} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Dashboard" component={MoodDashboard} />
      <Drawer.Screen name="Sign Out" component={SignOutScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        // simulate loading fonts/auth
        await new Promise<void>((resolve) => {
          onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            resolve();
          });
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // show custom splash for 2s
      const timer = setTimeout(() => {
        setShowCustomSplash(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [appIsReady]);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem("alreadyLaunched");
      if (hasLaunched === null) {
        await AsyncStorage.setItem("alreadyLaunched", "true");
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);
  if (!appIsReady || firstLaunch === null) {
    return null; // still waiting for async stuff
  }

  if (showCustomSplash) {
    return <SplashScreenComponent />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {firstLaunch ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignupScreen} />
          </Stack.Navigator>
        ) : isLoggedIn ? (
          <DrawerNavigator />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignupScreen} />
          </Stack.Navigator>
        )}
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
