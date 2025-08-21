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
          backgroundColor: "#fff",
          image: <Image source={require("../assets/logo.png")} />,
          title: "Welcome to QuietSpacer",
          subtitle: "Find your quiet spaces easily.",
        },
        {
          backgroundColor: "#fdeb93",
          image: <Image source={require("../assets/logo.png")} />,
          title: "Bookmark Places",
          subtitle: "Save your favorite locations for later.",
        },
        {
          backgroundColor: "#e9bcbe",
          image: <Image source={require("../assets/logo.png")} />,
          title: "Add you favourite quiet places",
          subtitle:
            "Share your favorite quiet spots with the community. So they can enjoy them too.",
        },
        {
          backgroundColor: "#e9bcbe",
          image: <Image source={require("../assets/logo.png")} />,
          title: "Track Your Mood",
          subtitle: "Log how you feel in different places.",
        },
        {
          backgroundColor: "#e9bcbe",
          image: <Image source={require("../assets/logo.png")} />,
          title: "Give them a calm score",
          subtitle:
            "Rate how calming a place is for you. Help others find their quiet space.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
