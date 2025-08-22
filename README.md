<!-- Repository Information & Links -->
<br />

![GitHub repo size](https://img.shields.io/github/repo-size/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3)
![GitHub watchers](https://img.shields.io/github/watchers/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3)
![GitHub language count](https://img.shields.io/github/languages/count/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3)
![GitHub Language](https://img.shields.io/github/languages/top/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3)
![GitHub Downloads](https://img.shields.io/github/downloads/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/total)

<!-- HEADER SECTION -->
<h3 align="center">QuietSpacer</h3>
<h5 align="center">A Calmness & Mindfulness Mobile Application</h5>
</br>
<p align="center">
  <a href="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3">
    <img src="assets/logo.png" align="center" alt="QuietSpacer Logo" width="auto" height="140">
  </a>
  <br />
  <br />
  <a href="https://drive.google.com/your-demo-link">View Demo</a>
  ·
  <a href="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/issues">Report Bug</a>
  ·
  <a href="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/issues">Request Feature</a>
</p>

---

## Table of Contents

* [About the Project](#about-the-project)
  * [Project Description](#project-description)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [How to Install](#how-to-install)
* [Features and Functionality](#features-and-functionality)
* [Concept Process](#concept-process)
  * [Ideation](#ideation)
  * [Wireframes](#wireframes)
  * [Custom UI](#custom-ui)
* [Development Process](#development-process)
  * [Implementation Process](#implementation-process)
    * [Highlights](#highlights)
    * [Challenges](#challenges)
  * [Future Implementation](#future-implementation)
* [Final Outcome](#final-outcome)
  * [Mockups](#mockups)
  * [Video Demonstration](#video-demonstration)
* [Conclusion](#conclusion)
* [License](#license)
* [Contact](#contact)
* [Responsibilities](#responsibilities)
* [Acknowledgements](#acknowledgements)

---

## Project Description

**QuietSpacer** is a mobile mindfulness application designed to help users reduce stress and increase calmness. It allows individuals to explore calming sounds, track moods, and engage in guided breathing exercises. The app is built with **React Native** and integrates Firebase for authentication and Firestore for storing user data such as moods, bookmarks, and reviews.  

---

## Built With

- **Frontend / Mobile**
  - [React Native](https://reactnative.dev/)
  - [Expo](https://expo.dev/)
  - [React Navigation](https://reactnavigation.org/)
  - [React Native Maps](https://github.com/react-native-maps/react-native-maps)

- **Backend / Database**
  - [Firebase Authentication](https://firebase.google.com/)
  - [Firestore Database](https://firebase.google.com/docs/firestore)

- **UI / Styling**
  - [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
  - [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
  - [Progress](https://www.npmjs.com/package/react-native-progress)

---

## Getting Started

### Prerequisites

- **Node.js** (v16+)
- **Expo CLI** installed globally:
```sh
npm install -g expo-cli
```
###How to Install
1. **Clone the repository:**
```sh
git clone https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3.git
```
2. **Install dependencies**
```sh
npm install
```
3. **Create Firebase Authentication, Database and Storage**

4. **Create a .firebase.ts file in the root with your Firebase credentials:**
```sh
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";;
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
API_KEY=your_api_key
AUTH_DOMAIN=your_project.firebaseapp.com
PROJECT_ID=your_project_id
STORAGE_BUCKET=your_project.appspot.com
MESSAGING_SENDER_ID=your_sender_id
APP_ID=your_app_id
}

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
export const db = getFirestore(app)

```
5.**Run the project:**
```sh
npm start
```


## Features and Functionality

  <img src="assets/Splashscreen.png" align="center" alt="splashscreen" width="80%" height="auto">

### SplashScreen
- Displays app logo while app resources load.

### OnBoardingScreen
- Introduces new users to the app features.
- shows a series of tutorial slides or info pages.

## LoginScreen and Signup
- Handles user authentication and signup.
- includes username email/password inputs and profile image for profile display.

### HomeScreen
- The main screen after login
- Can look on map for nearby locations which have been marked as quiet and peaceful
- Add new places which you yourself find calming and might want to recommend to others

 ### Dashboard
- The main dashboard after login.
- Likely displays summaries of user data, moods, or visited places.

### BookmarkScreen
- Shows places the user has bookmarked or favorited.
- Each card includes details like place name, calm score and location

### PlaceDetailsScreen
- Displays detailed information for a specific place.
- Can bookmark the place for if wanting to be found later
- Add and view other user reviews
- look at calm score

### ProfileScreen
- User profile management.
- Look at recently entered moods



