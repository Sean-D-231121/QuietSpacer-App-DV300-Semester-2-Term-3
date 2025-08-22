
<br />

![GitHub repo size](https://img.shields.io/github/repo-size/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3)
![GitHub watchers](https://img.shields.io/github/watchers/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3)
![GitHub language count](https://img.shields.io/github/languages/count/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3)
![GitHub Language](https://img.shields.io/github/languages/top/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3)
![GitHub Downloads](https://img.shields.io/github/downloads/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/total)


<h3 align="center">QuietSpacer</h3>
<h5 align="center">A Mobile Application to find quiet spots</h5>
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
  * [style guide](#style-guide)
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

### SplashScreen
- Displays app logo while app resources load.
<p align="center">
 <img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/SplashScreen.png" align="center" alt="splashscreen" width="20%" height="auto">
</p>
### OnBoardingScreen
- Introduces new users to the app features.
- shows a series of tutorial slides or info pages.
  <p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/OnboardingScreen.png" align="center" alt="Place-Details" width="20%" height="auto">
    </p>
## LoginScreen and Signup
- Handles user authentication and signup.
- includes username email/password inputs and profile image for profile display.
<p align="center">
  <img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/SignUp.png" align="center" alt="Signup" width="20%" height="auto">
  <img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Login.png" align="center" alt="Login" width="20%" height="auto">
</p>
### HomeScreen
- The main screen after login
- Can look on map for nearby locations which have been marked as quiet and peaceful
- Add new places which you yourself find calming and might want to recommend to others
<p align="center">
  <img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/HomeScreen.png" alt="Homescreen" width="20%" />
  <img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Add-place.png" alt="Add-place" width="20%" />
  <img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/View-place details.png" alt="View-place-details" width="20%" />
</p>

 ### Dashboard
- The main dashboard after login.
- Likely displays summaries of user data, moods, or visited places.
<p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Dashboard.png" align="center" alt="Dashboard" width="20%" height="auto">
</p>
### BookmarkScreen
- Shows places the user has bookmarked or favorited.
- Each card includes details like place name, calm score and location
<p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/BookmarkScreen.png" align="center" alt="BookmarkScreen" width="20%" height="auto">
</p>

### PlaceDetailsScreen
- Displays detailed information for a specific place.
- Can bookmark the place for if wanting to be found later
- Add and view other user reviews
- look at calm score
<p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Place-Details.png" align="center" alt="Place-Details" width="20%" height="auto">
</p>

### ProfileScreen
- User profile management.
- Look at recently entered moods
<p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/ProfileScreen.png" align="center" alt="ProfileScreen" width="20%" height="auto">
</p>


##Concept Process

###Ideation
I was Given Three Inspiration Cards:
- Reduce Stress
- Geolocation
- No traditional buttons

I found it challenging to come up with an idea for this my intial idea was to capture sounds in the vicinity and come up with a playlist but thinking back it was too much so I decided to make an app which allows you to mark locations for people who want to relaxing area where they can just relax.

###Wireframes
<p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-SplashScreen.png" align="center" alt="SplashScreen" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-SignUp.png" align="center" alt="Signup" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-HomeScreen.png" align="center" alt="HomeScreen" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-PlaceDetails.png" align="center" alt="PlaceDetails" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-Add-Place.png" align="center" alt="Add-place" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-ProfileScreen.png" align="center" alt="ProfileScreen" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-BookmarkScreen.png" align="center" alt="BookmarkScreen" width="20%" height="auto">
</p>
###Style-Guide
<p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/logos" align="center" alt="Logos" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/colours.png" align="center" alt="ColourScheme" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/fonts.png" align="center" alt="Fonts" width="20%" height="auto">
</p>
