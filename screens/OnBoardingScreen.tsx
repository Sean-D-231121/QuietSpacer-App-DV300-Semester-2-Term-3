// screens/OnboardingScreen.tsx
import React from "react";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = ({ navigation }: any) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      pages={[
        {
          backgroundColor: "#fdf5e6",
          image: <Image source={require("../assets/logo.png")} />,
          title: "Welcome to QuietSpacer",
          subtitle: "Find your quiet spaces easily.",
        },
        {
          backgroundColor: "#add8e6",
          image: <Image source={require("../assets/logo.png")} />,
          title: "Bookmark Places",
          subtitle:
            "Save your favorite locations for later by clicking on bookmark when looking at place",
        },
        {
          backgroundColor: "#e9bcbe",
          image: <Image source={require("../assets/logo.png")} />,
          title: "Add your favourite quiet places",
          subtitle:
            "Share your favorite quiet spots with the community. So they can enjoy them too. To do this long press on map to add your area",
        },
        {
          backgroundColor: "#5f636db0",
          image: <Image source={require("../assets/logo.png")} />,
          title: "Track Your Mood",
          subtitle:
            "Log how you feel in different places. Click on place select how you feel at that moment.",
        },
        {
          backgroundColor: "#fca5a5",
          image: <Image source={require("../assets/logo.png")} />,
          title: "Give them a calm score",
          subtitle:
            "Rate how calming a place is for you when reviewing place. Help others find their quiet space.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
