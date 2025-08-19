import { initializeApp } from "firebase/app";
import {
  initializeAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzBAnIQl0stEPXy27iw_trymKREChjg28",
  authDomain: "dv-300-quietspacer-term-3.firebaseapp.com",
  projectId: "dv-300-quietspacer-term-3",
  storageBucket: "dv-300-quietspacer-term-3.firebasestorage.app",
  messagingSenderId: "163410259839",
  appId: "1:163410259839:web:d53b5ba80cd3af510bb44a",
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app)
