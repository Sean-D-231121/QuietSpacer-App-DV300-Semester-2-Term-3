import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";;
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
export const db = getFirestore(app)
