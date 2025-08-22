
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
  <a href="https://drive.google.com/file/d/1rW7ZWpmjM3x7iSRn6ewZE2RgiZ7SC3zH/view?usp=sharing">View Demo</a>
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
## About the Project
### Project Description

**QuietSpacer** is a mobile geolocation mindfulness application designed to help users reduce stress and increase calmness by finding suitable places to rest. It allows individuals to explore new quiet spots and track moods. The app is built with **React Native** and integrates Firebase for authentication and Firestore for storing user data such as moods, bookmarks, and reviews.  

---

### Built With

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
### How to Install
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
    
### LoginScreen and Signup
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


## Concept Process

### Ideation
I was Given Three Inspiration Cards:
- Reduce Stress
- Geolocation
- No traditional buttons

I found it challenging to come up with an idea for this my intial idea was to capture sounds in the vicinity and come up with a playlist but thinking back it was too much so I decided to make an app which allows you to mark locations for people who want to relaxing area where they can just relax.

### Wireframes
<p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-SplashScreen.png" align="center" alt="SplashScreen" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-Signup.png" align="center" alt="Signup" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-HomeScreen.png" align="center" alt="HomeScreen" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-PlaceDetails.png" align="center" alt="PlaceDetails" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-Add-Place.png" align="center" alt="Add-place" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-ProfileScreen.png" align="center" alt="ProfileScreen" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Wireframe-BookmarkScreen.png" align="center" alt="BookmarkScreen" width="20%" height="auto">
</p>

### Style-Guide
<p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/logos.png" align="center" alt="Logos" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/colours.png" align="center" alt="ColourScheme" width="20%" height="auto">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/fonts.png" align="center" alt="Fonts" width="20%" height="auto">
</p>

## Development Process
### Implementation process

* **Frontend** (React-Native + TypeScript + Expo)

  * Set up the react-native expo project.
  * Implemented navigation using react-navigation.
  * Implemented maps using react-native-maps.
  * Implemented Tweening for maps and profile.
  * Used expo-location to find my current location to search for nearby places.

* **Backend** (Firebase Authentication + Firebase Cloud Database + Firebase Cloud Storage)

  * Enabled Authentication of user through email and password and user creation
    in AuthService.ts
  * Able to store and add images to storage in firebase for others reference in
    BucketService.ts
  * Use CRUD Functionality to create, get, update and delete from database
    through DbService.ts

#### Highlights

* Able to add place on map through a long press and store it in database
* Dashboard which keeps track of moods in places
* Reviews which can store calm score and calculate it
* Using Swipe buttons instead of traditonal buttons.
* UI was fun to implement and I felt the packages were easier use.
* Onboarding screen was fun and was the easiest to implement.

#### Challenges

* Adding a place to database and getting the correct information.
* HomeStack was annoying to implement with DrawerNavigation.
* Struggled implementing SplashScreen.
* Showing markers and getting them from database.
* The different UI of android and Iphone.
* native Keyboard conflicts.
* Getting Firebase storage to work.

### Future Implementation

* **Gamification**: Introduce badges or rewards for discovering new quiet places or contributing reviews.
* **Community Features**: Add a feed where users can share experiences, tips, or photos of quiet spots.
* **Mood Journal Enhancements**: Expand tracking to include stress levels, focus, or productivity insights.
* **Push Notifications**: Notify users about nearby quiet spots or reminders to take mindfulness breaks.
* **Directions Support**: Provide direction support for safe travelling.
* **Dark Mode / Theme Customization**: Give users the option to personalize the look and feel of the app.
* 
These are some future implementations which I believe will make it more interactive and fun to use for people who want to find.

## Final Outcome

### Mockups

<p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Mockup-1.png" align="center" alt="Mockup-1" width="80%" height="auto">
</p>
<p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Mockup-2.png" align="center" alt="Mockup-2" width="80%" height="auto">
</p>
<p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Mockup-3.png" align="center" alt="Mockup-3" width="80%" height="auto">
</p>
<p align="center">
<img src="https://github.com/Sean-D-231121/QuietSpacer-App-DV300-Semester-2-Term-3/blob/main/assets/Mockup-4.png" align="center" alt="Mockup-4" width="80%" height="auto">
</p>

### Video Demonstration

[View Demonstration](https://drive.google.com/file/d/1rW7ZWpmjM3x7iSRn6ewZE2RgiZ7SC3zH/view?usp=sharing)

## Conclusion

QuietSpacer successfully combines geolocation, mindfulness, and community-driven features to help users discover peaceful spaces and track their moods. Built with React Native and Firebase, it offers a simple yet engaging way to reduce stress. With future enhancements, it has strong potential to grow into a valuable wellness tool.


## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

**Sean Dubbelman**  
Email: [231121@virtualwindow.co.za](mailto:231121@virtualwindow.co.za)  
GitHub: [@Sean](https://github.com/Sean-D-231121)


## Acknowledgements
* [Lecturer](https://github.com/Armand-OW)
* **Figma** for wireframing
* **Maps** for react-native-maps
* **react-native-reanimate** for animations
* **Firebase** for authentication, storage and CRUD functionality
* **React-native** for app building
* **expo** for development / runtime and some native functions
* [YouTube](https://www.youtube.com/)



